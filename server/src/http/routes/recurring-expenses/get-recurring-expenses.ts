import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/recurring-expenses:
 *   get:
 *     summary: Get recurring expenses
 *     description: Retrieve a list of recurring expenses for the authenticated user.
 *     tags:
 *       - Recurring Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recurring expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "recurring123"
 *                       amount:
 *                         type: number
 *                         example: 50.75
 *                       description:
 *                         type: string
 *                         example: "Monthly subscription"
 *                       category:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Subscriptions"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-21T14:28:23.382Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function getRecurringExpenses(app: FastifyInstance) {
  app.get(
    '/api/recurring-expenses',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest
      const userId = authenticatedRequest.userId

      try {
        // Fetch recurring expenses for the authenticated user
        const recurringExpenses = await prisma.recurringExpense.findMany({
          where: {
            userId
          },
          include: {
            category: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        return reply.status(200).send({ data: recurringExpenses })
      } catch (error) {
        console.error('Error fetching recurring expenses:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
