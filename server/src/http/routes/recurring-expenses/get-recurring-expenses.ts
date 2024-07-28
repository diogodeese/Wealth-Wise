import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

export async function getRecurringExpenses(app: FastifyInstance) {
  app.get(
    '/api/recurring-expenses',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest
      const userId = authenticatedRequest.userId

      try {
        const recurringExpenses = await prisma.recurringExpense.findMany({
          where: {
            userId
          },
          include: {
            category: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        return reply.status(200).send(recurringExpenses)
      } catch (error) {
        return reply
          .status(500)
          .send({ error: 'Failed to fetch recurring expenses' })
      }
    }
  )
}
