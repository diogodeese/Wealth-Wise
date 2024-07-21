import { Prisma } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

interface MonthRequestParams {
  month: number
  year: number
}

export async function getTotalExpensesForMonth(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-month',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest
      const { month, year }: MonthRequestParams =
        request.query as MonthRequestParams

      try {
        // Calculate the start and end dates for the specified month
        const startDate = new Date(year, month - 1, 1, 0, 0, 0)
        const endDate = new Date(year, month, 0, 23, 59, 59)

        const expensesForMonth = await prisma.expense.findMany({
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

        // Calculate the total amount of expenses for the specified month
        const totalExpensesForMonth = parseFloat(
          expensesForMonth
            .reduce(
              (acc: number, expense: Prisma.ExpenseUncheckedCreateInput) =>
                acc + expense.amount,
              0
            )
            .toFixed(2)
        )

        return reply.status(200).send({ data: { totalExpensesForMonth } })
      } catch (error) {
        console.error('Error fetching total expenses for month:', error)
        return reply.status(500).send('Internal Server Error')
      }
    }
  )
}
