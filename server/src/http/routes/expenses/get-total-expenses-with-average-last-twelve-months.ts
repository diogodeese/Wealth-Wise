import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { ErrorHandler } from '../../../utils/error-handling/error-handler'
import ErrorObserver from '../../../utils/error-handling/error-observer'
import { validateToken } from '../../middleware/validate-token'

interface TotalExpenseByMonth {
  month: string
  totalAmount: number
}

async function fetchTotalExpensesForLastTwelveMonths(userId: string): Promise<{
  totalExpensesByMonth: TotalExpenseByMonth[]
  averageTotalAmount: number
}> {
  try {
    // SQL query to get expenses grouped by month
    const totalExpensesByMonth: TotalExpenseByMonth[] =
      await prisma.$queryRawUnsafe(
        `
      SELECT DATE_FORMAT(date, '%m/%Y') AS month, SUM(amount) AS totalAmount
      FROM Expense
      WHERE userId = ? 
        AND date < DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')
        AND date >= DATE_SUB(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL 12 MONTH)
      GROUP BY month
      `,
        userId
      )

    if (totalExpensesByMonth.length === 0) {
      throw new Error('No expenses found for the last 12 months')
    }

    // Calculate the average total amount
    const totalAmountSum = totalExpensesByMonth.reduce(
      (acc, entry) => acc + entry.totalAmount,
      0
    )
    const averageTotalAmount = parseFloat(
      (totalAmountSum / totalExpensesByMonth.length).toFixed(2)
    )

    return { totalExpensesByMonth, averageTotalAmount }
  } catch (error) {
    ErrorObserver.notifyAll(error)
    throw error
  }
}

async function handleGetTotalExpensesWithAverageLastTwelveMonths(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { userId } = request as AuthenticatedRequest

    if (!userId) {
      return reply.status(401).send({ error: 'User not authenticated' })
    }

    const { totalExpensesByMonth, averageTotalAmount } =
      await fetchTotalExpensesForLastTwelveMonths(userId)

    return reply.status(200).send({
      totalExpensesByMonth,
      averageTotalAmount
    })
  } catch (error) {
    ErrorHandler.handleError(reply, error)
  }
}

export async function getTotalExpensesWithAverageLastTwelveMonths(
  app: FastifyInstance
) {
  app.get(
    '/api/total-expenses-with-average-last-twelve-months',
    {
      preHandler: [validateToken]
    },
    handleGetTotalExpensesWithAverageLastTwelveMonths
  )
}
