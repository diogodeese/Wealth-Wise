import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { validateToken } from '../../middleware/validate-token'

/**
 * @swagger
 * /api/expense-categories:
 *   post:
 *     tags:
 *       - Expense Categories
 *     summary: Create an expense category
 *     description: Creates a new expense category for the authenticated user. Requires a valid token.
 *     security:
 *       - bearerAuth: []  # Specify that this endpoint requires a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Groceries
 *               essential:
 *                 type: boolean
 *                 example: true
 *               description:
 *                 type: string
 *                 example: Expenses related to food and grocery shopping
 *               budgetCap:
 *                 type: number
 *                 example: 500.00
 *     responses:
 *       201:
 *         description: Expense category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1234
 *                     name:
 *                       type: string
 *                       example: Groceries
 *                     essential:
 *                       type: boolean
 *                       example: true
 *                     description:
 *                       type: string
 *                       example: Expenses related to food and grocery shopping
 *                     budgetCap:
 *                       type: string
 *                       example: "500.00"
 *       400:
 *         description: Validation failed or invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Required field"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["name"]
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
export async function createExpenseCategory(app: FastifyInstance) {
  app.post(
    '/api/expense-categories',
    { preHandler: [validateToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const createExpenseCategoryBody = z.object({
          name: z.string(),
          essential: z.boolean(),
          description: z.string(),
          budgetCap: z.number().optional()
        })

        const { name, essential, description, budgetCap } =
          createExpenseCategoryBody.parse(request.body)

        // Verify if the user exists
        const userExists = await prisma.user.findUnique({
          where: { id: authenticatedRequest.userId }
        })

        if (!userExists) {
          return reply.status(404).send({ error: 'User not found' })
        }

        const expenseCategory = await prisma.expenseCategory.create({
          data: {
            name,
            essential,
            description,
            budgetCap
          }
        })

        if (!authenticatedRequest.userId) {
          return reply.status(400).send({ error: 'Invalid user ID' })
        }

        await prisma.userExpenseCategory.create({
          data: {
            userId: authenticatedRequest.userId,
            expenseCategoryId: expenseCategory.id
          }
        })

        return reply.status(201).send({
          data: {
            id: expenseCategory.id,
            name: expenseCategory.name,
            essential: expenseCategory.essential,
            description: expenseCategory.description,
            budgetCap: expenseCategory.budgetCap?.toFixed(2) || '0.00'
          }
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply
            .status(400)
            .send({ error: 'Validation failed', details: error.errors })
        }

        console.error('Error creating expense category:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
