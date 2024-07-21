import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

export async function getEmergencyFund(app: FastifyInstance) {
  app.get(
    '/api/emergency-fund',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      const querySchema = z.object({
        fundMonths: z
          .string()
          .transform((val) => Number(val))
          .default('6')
          .pipe(z.number().min(1).max(24)),
        essentialsOnly: z
          .string()
          .transform((val) => val === 'true')
          .default('true')
          .pipe(z.boolean()),
        averageMonths: z
          .string()
          .transform((val) => Number(val))
          .default('12')
          .pipe(z.number().min(1).max(24))
      })

      const { fundMonths, essentialsOnly, averageMonths } = querySchema.parse(
        request.query
      )

      try {
        const essentialCondition = essentialsOnly
          ? 'AND ec.essential = true'
          : ''

        const totalExpensesByMonth: { month: string; totalAmount: number }[] =
          await prisma.$queryRawUnsafe(
            `
          SELECT DATE_FORMAT(e.date, '%Y-%m') AS month, SUM(e.amount) AS totalAmount
          FROM Expense e
          JOIN ExpenseCategory ec ON e.categoryId = ec.id
          WHERE e.userId = ?
            AND e.date < DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')
            AND e.date >= DATE_SUB(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01'), INTERVAL ? MONTH)
            ${essentialCondition}
          GROUP BY month
          HAVING totalAmount > 0
        `,
            authenticatedRequest.userId,
            averageMonths
          )

        if (totalExpensesByMonth.length === 0) {
          console.warn('No expenses found for the given criteria')
        }

        const totalAmounts = totalExpensesByMonth.map(
          (entry) => entry.totalAmount
        )
        const totalAmountSum = totalAmounts.reduce((acc, curr) => acc + curr, 0)
        const monthCount = totalAmounts.length

        if (monthCount === 0) {
          return reply.status(200).send({
            averageTotalAmount: 0,
            emergencyFund: 0
          })
        }

        const averageTotalAmount = totalAmountSum / monthCount
        const emergencyFund = averageTotalAmount * fundMonths

        return reply.status(200).send({
          data: {
            averageTotalAmount: parseFloat(averageTotalAmount.toFixed(2)),
            emergencyFund: parseFloat(emergencyFund.toFixed(2))
          }
        })
      } catch (error) {
        console.error('Error calculating emergency fund:', error)
        return reply.status(500).send('Internal Server Error')
      }
    }
  )
}
