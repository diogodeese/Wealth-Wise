import { Prisma } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/total-expenses-for-month:
 *   get:
 *     summary: Retrieve total expenses for a specific month
 *     description: Returns the total expenses for a given month and year for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: The month for which to retrieve expenses (1-12).
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1000
 *           maximum: 9999
 *         description: The year for which to retrieve expenses.
 *     responses:
 *       200:
 *         description: Total expenses for the specified month and year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalExpensesForMonth:
 *                       type: number
 *                       example: 1500.50
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *                 details:
 *                   type: string
 *                   example: "Month must be between 1 and 12, and year must be a valid four-digit number"
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
export async function getTotalExpensesForMonth(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-month',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        interface MonthRequestParams {
          month: number
          year: number
        }

        const { month, year }: MonthRequestParams =
          request.query as MonthRequestParams

        // Check if user is authenticated
        if (!authenticatedRequest.userId) {
          return reply.status(401).send({ error: 'User not authenticated' })
        }

        // Validate month and year input
        if (
          isNaN(month) ||
          isNaN(year) ||
          month < 1 ||
          month > 12 ||
          year < 1000 ||
          year > 9999
        ) {
          return reply.status(400).send({
            error: 'Invalid request parameters',
            details:
              'Month must be between 1 and 12, and year must be a valid four-digit number'
          })
        }

        // Calculate the start and end dates for the specified month
        const startDate = new Date(year, month - 1, 1, 0, 0, 0)
        const endDate = new Date(year, month, 0, 23, 59, 59)

        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { id: authenticatedRequest.userId }
        })
        if (!user) {
          return reply.status(404).send({ error: 'User not found' })
        }

        // Retrieve expenses for the month
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle Prisma-specific errors
          console.error('Database error:', error)
          return reply.status(500).send({ error: 'Database error' })
        }

        console.error('Error fetching total expenses for month:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
