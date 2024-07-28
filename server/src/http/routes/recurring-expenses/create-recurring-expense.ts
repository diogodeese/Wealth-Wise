import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

export async function createRecurringExpense(app: FastifyInstance) {
  app.post(
    '/api/recurring-expenses',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      const createRecurringExpenseBody = z.object({
        amount: z.number(),
        description: z.string(),
        categoryId: z.string(),
        recurrenceDay: z.number().int().min(1).max(31)
      })

      const { amount, description, categoryId, recurrenceDay } =
        createRecurringExpenseBody.parse(request.body)

      try {
        const recurringExpense = await prisma.recurringExpense.create({
          data: {
            userId: authenticatedRequest.userId!,
            amount,
            description,
            categoryId,
            recurrenceDay
          }
        })

        return reply.status(201).send(recurringExpense)
      } catch (error) {
        console.error('Error creating recurring expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
