import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { validateToken } from '../../middleware/validate-token'

/**
 * @swagger
 * /api/expense-categories/{expenseCategoryId}:
 *   put:
 *     tags:
 *       - Expense Categories
 *     summary: Update an expense category
 *     description: Updates an expense category for the authenticated user. Requires a valid token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expenseCategoryId
 *         required: true
 *         description: The ID of the expense category to update
 *         schema:
 *           type: string
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
 *                 example: Updated expenses related to food and grocery shopping
 *               budgetCap:
 *                 type: number
 *                 example: 600.00
 *     responses:
 *       200:
 *         description: Expense category updated successfully
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
 *                       example: Updated expenses related to food and grocery shopping
 *                     budgetCap:
 *                       type: number
 *                       example: 600.00
 *       400:
 *         description: Validation failed
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
 *                         example: "Invalid type"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["name"]
 *       404:
 *         description: Expense category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Expense category not found
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
 *                   example: Internal Server Error
 */

export async function updateExpenseCategory(app: FastifyInstance) {
  app.put(
    '/api/expense-categories/:expenseCategoryId',
    { preHandler: [validateToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const paramsSchema = z.object({
          expenseCategoryId: z.string()
        })

        const updateExpenseCategoryBody = z.object({
          name: z.string().optional(),
          essential: z.boolean().optional(),
          description: z.string().optional(),
          budgetCap: z.number().optional()
        })

        // Validate request body
        const parsedBody = updateExpenseCategoryBody.safeParse(request.body)
        if (!parsedBody.success) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: parsedBody.error.errors
          })
        }

        // Validate request params
        const parsedParams = paramsSchema.safeParse(request.params)
        if (!parsedParams.success) {
          return reply.status(400).send({
            error: 'Invalid category ID',
            details: parsedParams.error.errors
          })
        }

        const { name, essential, description, budgetCap } = parsedBody.data
        const { expenseCategoryId } = parsedParams.data

        // Verify if the expense category exists and belongs to the user
        const userExpenseCategory = await prisma.userExpenseCategory.findFirst({
          where: {
            userId: authenticatedRequest.userId,
            expenseCategoryId: expenseCategoryId
          }
        })

        if (!userExpenseCategory) {
          return reply.status(404).send({ error: 'Expense category not found' })
        }

        // Update the expense category
        const updatedExpenseCategory = await prisma.expenseCategory.update({
          where: { id: expenseCategoryId },
          data: {
            name,
            essential,
            description,
            budgetCap
          }
        })

        return reply.status(200).send({
          data: {
            id: updatedExpenseCategory.id,
            name: updatedExpenseCategory.name,
            essential: updatedExpenseCategory.essential,
            description: updatedExpenseCategory.description,
            budgetCap: updatedExpenseCategory.budgetCap
          }
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors
          })
        }

        console.error('Error updating expense category:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
