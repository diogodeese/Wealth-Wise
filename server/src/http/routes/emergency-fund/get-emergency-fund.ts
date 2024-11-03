import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/emergency-fund:
 *   get:
 *     summary: Get Emergency Fund Calculation
 *     description: Calculates the required emergency fund based on the user's average monthly expenses and custom criteria.
 *     tags:
 *       - Emergency Fund
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fundMonths
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 24
 *           default: 6
 *         required: false
 *         description: "The number of months of expenses to cover in the emergency fund."
 *       - in: query
 *         name: essentialsOnly
 *         schema:
 *           type: boolean
 *           default: true
 *         required: false
 *         description: "Whether to only include essential expenses in the calculation."
 *       - in: query
 *         name: averageMonths
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 24
 *           default: 12
 *         required: false
 *         description: "The number of recent months to calculate the average expenses."
 *     responses:
 *       200:
 *         description: Emergency fund calculation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     averageTotalAmount:
 *                       type: number
 *                       example: 1500.0
 *                       description: "The average monthly expense calculated."
 *                     emergencyFund:
 *                       type: number
 *                       example: 9000.0
 *                       description: "The required emergency fund based on the specified months of coverage."
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameters"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "fundMonths must be between 1 and 24"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not authenticated"
 *       404:
 *         description: No expenses found for the specified criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No expenses found for the given criteria"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
export async function getEmergencyFund(app: FastifyInstance) {
  app.get(
    '/api/emergency-fund',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        // Check if user is authenticated
        if (!authenticatedRequest.userId) {
          return reply.status(401).send({ error: 'User not authenticated' })
        }

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

        if (!totalExpensesByMonth.length) {
          return reply.status(404).send({
            error: 'No expenses found for the given criteria'
          })
        }

        const totalAmounts = totalExpensesByMonth.map(
          (entry) => entry.totalAmount
        )
        const totalAmountSum = totalAmounts.reduce((acc, curr) => acc + curr, 0)
        const monthCount = totalAmounts.length

        if (monthCount === 0) {
          return reply.status(200).send({
            data: {
              averageTotalAmount: 0,
              emergencyFund: 0
            }
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
        if (error instanceof ZodError) {
          // Handle validation errors for query parameters
          const validationErrors = error.errors.map((err) => err.message)
          return reply.status(400).send({
            error: 'Invalid query parameters',
            details: validationErrors
          })
        } else if (error instanceof PrismaClientKnownRequestError) {
          // Handle Prisma-specific errors
          console.error('Database error:', error)
          return reply.status(500).send({ error: 'Database error' })
        }

        console.error('Error calculating emergency fund:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
