// routes/expenses.ts

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

interface WhereCondition {
  userId: string | undefined
  categoryId?: {
    in: string[]
  }
  date?: {
    gte?: Date // Greater than or equal to
    lte?: Date // Less than or equal to
  }
}

export async function getExpenses(app: FastifyInstance) {
  app.get(
    '/api/expenses',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      const { categories, from, to } = authenticatedRequest.query as {
        categories?: string
        from?: string
        to?: string
      }

      let whereCondition: WhereCondition = {
        userId: authenticatedRequest.userId
      }

      if (categories) {
        whereCondition.categoryId = {
          in: categories.split(',')
        }
      }

      if (from && to) {
        whereCondition.date = {
          gte: new Date(from),
          lte: new Date(to)
        }
      }

      const expenses = await prisma.expense.findMany({
        where: whereCondition,
        include: {
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          date: 'desc'
        }
      })

      return reply.status(200).send(expenses)
    }
  )
}
