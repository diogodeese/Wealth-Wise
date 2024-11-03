import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

interface TotalExpenseByMonth {
  month: string
  totalAmount: number
}

/**
 * @swagger
 * /api/total-expenses-with-average-last-twelve-months:
 *   get:
 *     summary: Total and Average Expenses for Last 12 Months
 *     description: Retrieves total expenses for each month over the last 12 complete months and calculates the average expense amount.
 *     operationId: getTotalExpensesWithAverageLastTwelveMonths
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved total expenses and average for the last 12 months.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpensesByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: '10/2023'
 *                       totalAmount:
 *                         type: number
 *                         format: float
 *                         example: 250.75
 *                 averageTotalAmount:
 *                   type: number
 *                   format: float
 *                   example: 200.30
 *       '401':
 *         description: Unauthorized request when user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not authenticated
 *       '404':
 *         description: Not Found when no expenses are found for the last 12 months.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No expenses found for the last 12 months
 *       '500':
 *         description: Internal Server Error due to unexpected issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
export async function getTotalExpensesWithAverageLastTwelveMonths(
  app: FastifyInstance
) {
  app.get(
    '/api/total-expenses-with-average-last-twelve-months',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      try {
        // Check if user is authenticated
        if (!authenticatedRequest.userId) {
          return reply.status(401).send({ error: 'User not authenticated' })
        }

        // Get total expenses for each month over the last 12 complete months
        const totalExpensesByMonth: TotalExpenseByMonth[] =
          await prisma.$queryRaw`
          SELECT DATE_FORMAT(date, '%m/%Y') AS month, SUM(amount) AS totalAmount
          FROM Expense
          WHERE userId = ${authenticatedRequest.userId}
            AND date < DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')
            AND date >= DATE_SUB(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL 12 MONTH)
          GROUP BY month
        `

        // Check if expenses were found
        if (totalExpensesByMonth.length === 0) {
          return reply.status(404).send({
            error: 'No expenses found for the last 12 months'
          })
        }

        // Calculate the average of total expenses over the last 12 complete months
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
        // Handle Prisma-specific errors
        if (error instanceof PrismaClientKnownRequestError) {
          console.error('Database error:', error)
          return reply.status(500).send({ error: 'Database error' })
        }

        console.error(
          'Error fetching total expenses with average over last 12 months:',
          error
        )
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
