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
        date: z.string().refine(
          (value) => {
            const iso8601Pattern =
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/
            return iso8601Pattern.test(value)
          },
          { message: 'Invalid date format' }
        )
      })

      const { amount, description, categoryId, date } = createExpenseBody.parse(
        request.body
      )

      const parsedDate = new Date(date)

      const expense = await prisma.expense.create({
        data: {
          userId: request.userId!,
          amount,
          description,
          categoryId,
          date: parsedDate
        }
      })

      return reply.status(201).send({ expenseId: expense.id })
    }
  )
}
