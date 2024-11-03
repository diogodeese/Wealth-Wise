import { FastifyInstance, FastifyReply } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create an expense
 *     description: Create a new expense for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.5
 *               description:
 *                 type: string
 *                 example: "Groceries"
 *               categoryId:
 *                 type: string
 *                 example: "category123"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "expense456"
 *                     userId:
 *                       type: string
 *                       example: "user123"
 *                     categoryId:
 *                       type: string
 *                       example: "category123"
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "category123"
 *                         name:
 *                           type: string
 *                           example: "Groceries"
 *                         budgetCap:
 *                           type: number
 *                           example: 500.0
 *                     amount:
 *                       type: number
 *                       example: 100.5
 *                     description:
 *                       type: string
 *                       example: "Groceries"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-10-15"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-22T10:45:00Z"
 *                     warning:
 *                       type: string
 *                       example: "You are about to exceed your budget for this category."
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Invalid amount format"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "amount"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
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

      try {
        // Validate the request body
        const { amount, description, categoryId, date } =
          createExpenseBody.parse(request.body)
        const parsedDate = new Date(date)

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
          data: {
            id: expense.id,
            userId: expense.userId,
            categoryId: expense.categoryId,
            category: expense.category,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
            createdAt: expense.createdAt,
            warning // Include the warning in the response
          }
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors.map((err) => ({
              message: err.message,
              path: err.path
            }))
          })
        }

        console.error('Error creating expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
