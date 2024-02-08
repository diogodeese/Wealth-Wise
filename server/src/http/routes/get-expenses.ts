import { FastifyInstance, FastifyReply } from 'fastify'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyAndRegenerateToken } from '../middleware/verify-regenerate-token'

export async function getExpenses(app: FastifyInstance) {
  app.get(
    '/expenses',
    { preHandler: [verifyAndRegenerateToken] },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      const expenses = await prisma.expense.findMany({
        where: {
          userId: request.userId
        }
      })

      return reply.status(200).send({ expenses })
    }
  )
}
