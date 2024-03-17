import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

interface TotalExpenseByMonth {
  month: string
  totalAmount: number
}

export async function getTotalExpensesWithAverageLastTwelveMonths(
  app: FastifyInstance
) {
  app.get(
    '/api/total-expenses-with-average-last-twelve-months',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      try {
        // Get total expenses for each month over the last 12 months
        const totalExpensesByMonth: TotalExpenseByMonth[] =
          await prisma.$queryRaw`
          SELECT DATE_FORMAT(date, '%m/%Y') AS month, SUM(amount) AS totalAmount
          FROM Expense
          WHERE userId = ${authenticatedRequest.userId}
            AND date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
          GROUP BY month
        `

        // Calculate the average of total expenses over the last 12 months
        const totalAmounts = totalExpensesByMonth.map(
          (entry: TotalExpenseByMonth) => entry.totalAmount
        )

        const totalExpensesCount = totalAmounts.length
        const totalAmountSum = totalAmounts.reduce(
          (acc: number, curr: number) => acc + curr,
          0
        )
        const averageTotalAmount = totalAmountSum / totalExpensesCount

        const formattedAverageTotalAmount = parseFloat(
          averageTotalAmount.toFixed(2)
        )

        return reply.status(200).send({
          totalExpensesByMonth,
          averageTotalAmount: formattedAverageTotalAmount
        })
      } catch (error) {
        console.error(
          'Error fetching total expenses with average over last 12 months:',
          error
        )
        return reply.status(500).send('Internal Server Error')
      }
    }
  )
}
