import { FastifyInstance, FastifyReply } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

// Backend - Fastify route handler
export async function createExpense(app: FastifyInstance) {
  app.post(
    '/api/expenses',
    { preHandler: [verifyToken] },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      const createExpenseBody = z.object({
        amount: z.number(),
        description: z.string(),
        categoryId: z.string(),
        date: z.string()
      })

      const { amount, description, categoryId, date } = createExpenseBody.parse(
        request.body
      )
      const parsedDate = new Date(date)

      try {
        // Fetch the category and sum of expenses for the current month
        const category = await prisma.expenseCategory.findUnique({
          where: { id: categoryId }
        })
        const currentMonthStart = new Date()
        currentMonthStart.setDate(1)
        currentMonthStart.setHours(0, 0, 0, 0)
        const totalExpenses = await prisma.expense.aggregate({
          _sum: { amount: true },
          where: {
            categoryId: categoryId,
            date: {
              gte: currentMonthStart,
              lte: new Date()
            }
          }
        })

        let warning = ''
        const currentMonthTotal = totalExpenses._sum.amount ?? 0 // Default to 0 if null
        if (category) {
          const monthlyTotal = currentMonthTotal + amount
          if (category.budgetCap && monthlyTotal > category.budgetCap) {
            warning = 'You are about to exceed your budget for this category.'
          }
        }

        // Create the expense in the database
        const expense = await prisma.expense.create({
          data: {
            userId: request.userId!,
            amount,
            description,
            categoryId,
            date: parsedDate
          },
          include: {
            user: true,
            category: true
          }
        })

        return reply.status(201).send({
          id: expense.id,
          userId: expense.userId,
          categoryId: expense.categoryId,
          category: expense.category,
          amount: expense.amount,
          description: expense.description,
          date: expense.date,
          createdAt: expense.createdAt,
          warning // Include the warning in the response
        })
      } catch (error) {
        console.error('Error creating expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
