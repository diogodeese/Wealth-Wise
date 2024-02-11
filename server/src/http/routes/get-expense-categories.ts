import { FastifyInstance, FastifyReply } from 'fastify'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

export async function getExpenseCategories(app: FastifyInstance) {
  app.get(
    '/api/expense-categories',
    { preHandler: [verifyToken] },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      const expenseCategories = await prisma.expenseCategory.findMany()

      return reply.status(200).send(expenseCategories)
    }
  )
}
