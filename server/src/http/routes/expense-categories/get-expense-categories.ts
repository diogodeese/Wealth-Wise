import { FastifyInstance, FastifyReply } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

export async function getExpenseCategories(app: FastifyInstance) {
  app.get(
    '/api/expense-categories',
    { preHandler: [verifyToken] },
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      // Ensure that the userId is defined
      if (!request.userId) {
        return reply.status(400).send({ error: 'Invalid user ID' })
      }

      try {
        // Fetch the expense category IDs that belong to the user
        const userExpenseCategories = await prisma.userExpenseCategory.findMany(
          {
            where: {
              userId: request.userId
            },
            select: {
              expenseCategoryId: true
            }
          }
        )

        // Extract the category IDs
        const expenseCategoryIds = userExpenseCategories.map(
          (uec) => uec.expenseCategoryId
        )

        // Fetch the expense categories based on the extracted IDs
        const expenseCategories = await prisma.expenseCategory.findMany({
          where: {
            id: {
              in: expenseCategoryIds
            }
          },
          orderBy: {
            id: 'desc'
          }
        })

        return reply.status(200).send(expenseCategories)
      } catch (error) {
        console.error('Error fetching expense categories:', error)
        return reply
          .status(500)
          .send({ error: 'Failed to fetch expense categories' })
      }
    }
  )
}
