import { Prisma } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

interface YearRequestParams {
  year: number
}

export async function getTotalExpensesForYear(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-year',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest
      const { year }: YearRequestParams = request.query as YearRequestParams

      try {
        // Calculate the start and end dates for the specified year
        const startDate = new Date(year, 0, 1, 0, 0, 0)
        const endDate = new Date(year, 11, 31, 23, 59, 59)

        const expensesForYear = await prisma.expense.findMany({
          where: {
            AND: [
              {
                userId: authenticatedRequest.userId
              },
              {
                date: {
                  gte: startDate,
                  lte: endDate
                }
              }
            ]
          }
        })

        // Calculate the total amount of expenses for the specified year
        const totalExpensesForYear = expensesForYear.reduce(
          (acc: number, expense: Prisma.ExpenseUncheckedCreateInput) =>
            acc + expense.amount,
          0
        )

        return reply.status(200).send({ data: { totalExpensesForYear } })
      } catch (error) {
        console.error('Error fetching total expenses for year:', error)
        return reply.status(500).send('Internal Server Error')
      }
    }
  )
}
