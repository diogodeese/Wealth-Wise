import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

const paramsSchema = z.object({
  recurringExpenseId: z.string()
})

export async function deleteRecurringExpense(app: FastifyInstance) {
  app.delete(
    '/api/recurring-expenses/:recurringExpenseId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      try {
        const { recurringExpenseId } = paramsSchema.parse(request.params)

        // Check if the recurring expense belongs to the authenticated user
        const recurringExpense = await prisma.recurringExpense.findUnique({
          where: {
            id: recurringExpenseId
          },
          select: {
            userId: true
          }
        })

        if (
          !recurringExpense ||
          recurringExpense.userId !== authenticatedRequest.userId
        ) {
          return reply
            .status(404)
            .send({ error: 'Recurring expense not found' })
        }

        await prisma.recurringExpense.delete({
          where: {
            id: recurringExpenseId
          }
        })

        return reply.status(204).send()
      } catch (error) {
        console.error('Error deleting recurring expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
