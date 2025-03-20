import { AuthenticatedRequest } from '@Interfaces/request'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { validateToken } from '../../middleware/validate-token'

/**
 * @swagger
 * /api/expense-categories:
 *   get:
 *     tags:
 *       - Expense Categories
 *     summary: Get expense categories
 *     description: Fetches all expense categories that belong to the authenticated user. Requires a valid token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expense categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1234
 *                   name:
 *                     type: string
 *                     example: Groceries
 *                   essential:
 *                     type: boolean
 *                     example: true
 *                   description:
 *                     type: string
 *                     example: Expenses related to food and grocery shopping
 *                   budgetCap:
 *                     type: number
 *                     example: 500.00
 *       400:
 *         description: Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user ID
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: User ID is required
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["userId"]
 *       401:
 *         description: Unauthorized - token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch expense categories
 */

export async function getExpenseCategories(app: FastifyInstance) {
  app.get(
    '/api/expense-categories',
    { preHandler: [validateToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { userId } = request as AuthenticatedRequest

        const userExpenseCategories = await prisma.userExpenseCategory.findMany(
          {
            where: { userId },
            select: { expenseCategoryId: true }
          }
        )

        const expenseCategoryIds = userExpenseCategories.map(
          (uec) => uec.expenseCategoryId
        )

        const expenseCategories = await prisma.expenseCategory.findMany({
          where: { id: { in: expenseCategoryIds } },
          orderBy: { id: 'desc' }
        })

        return reply.status(200).send(expenseCategories)
      } catch (error) {
        console.error('Error fetching expense categories:', error)
        return reply
          .status(500)
          .send({ error: 'Failed to fetch expense categories' })
      }
    }
  )
}
