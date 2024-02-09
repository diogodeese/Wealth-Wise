import { FastifyInstance, FastifyReply } from 'fastify'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

export async function getExpenses(app: FastifyInstance) {
  app.get(
    '/expenses',
    { preHandler: [verifyToken] },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      const expenses = await prisma.expense.findMany({
        where: {
          userId: request.userId
        },
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      })

      return reply.status(200).send(expenses)
    }
  )
}
