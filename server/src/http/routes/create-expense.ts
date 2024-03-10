import { FastifyInstance, FastifyReply } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

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
        // Create the expense in the database
        const expense = await prisma.expense.create({
          data: {
            userId: request.userId!,
            amount,
            description,
            categoryId,
            date: parsedDate
          },
          // Include related data in the response
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
          createdAt: expense.createdAt
        })
      } catch (error) {
        console.error('Error creating expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
