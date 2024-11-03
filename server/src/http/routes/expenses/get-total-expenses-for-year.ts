import { Expense, Prisma } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

interface YearRequestParams {
  year: number
}

/**
 * @swagger
 * /api/total-expenses-for-year:
 *   get:
 *     summary: Get Total Yearly Expenses
 *     description: Retrieves the total expenses for a specified year for an authenticated user.
 *     operationId: getTotalExpensesForYear
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         description: The four-digit year for which to retrieve total expenses.
 *         schema:
 *           type: integer
 *           example: 2022
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved total expenses for the specified year.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalExpensesForYear:
 *                       type: number
 *                       format: float
 *                       example: 1500.50
 *       '400':
 *         description: Bad Request due to invalid year parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameter
 *                 details:
 *                   type: string
 *                   example: Year must be a valid four-digit number
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
 *         description: Not Found when no expenses are found for the specified year.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No expenses found for the specified year
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
export async function getTotalExpensesForYear(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-year',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest
        const { year }: YearRequestParams = request.query as YearRequestParams

        // Check if user is authenticated
        if (!authenticatedRequest.userId) {
          return reply.status(401).send({ error: 'User not authenticated' })
        }

        // Validate year input
        if (isNaN(year) || year < 1000 || year > 9999) {
          return reply.status(400).send({
            error: 'Invalid request parameter',
            details: 'Year must be a valid four-digit number'
          })
        }

        // Calculate the start and end dates for the specified year
        const startDate = new Date(year, 0, 1, 0, 0, 0)
        const endDate = new Date(year, 11, 31, 23, 59, 59)

        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { id: authenticatedRequest.userId }
        })
        if (!user) {
          return reply.status(404).send({ error: 'User not found' })
        }

        // Retrieve expenses for the specified year
        const expensesForYear: Expense[] = await prisma.expense.findMany({
          where: {
            AND: [
              { userId: authenticatedRequest.userId },
              { date: { gte: startDate, lte: endDate } }
            ]
          }
        })

        // If no expenses were found
        if (expensesForYear.length === 0) {
          return reply
            .status(404)
            .send({ error: 'No expenses found for the specified year' })
        }

        // Calculate the total amount of expenses for the specified year
        const totalExpensesForYear = expensesForYear.reduce(
          (acc: number, expense: Expense) => acc + expense.amount,
          0
        )

        return reply.status(200).send({
          data: {
            totalExpensesForYear: parseFloat(totalExpensesForYear.toFixed(2))
          }
        })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle specific Prisma errors
          console.error('Database error:', error)
          return reply.status(500).send({ error: 'Database error' })
        }

        console.error('Error fetching total expenses for year:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
