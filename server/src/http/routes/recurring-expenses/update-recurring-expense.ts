import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/recurring-expenses/{recurringExpenseId}:
 *   put:
 *     summary: Update a recurring expense
 *     description: Updates an existing recurring expense for the authenticated user.
 *     tags:
 *       - Recurring Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recurringExpenseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recurring expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               categoryId:
 *                 type: string
 *                 example: "cat123"
 *               recurrenceDay:
 *                 type: number
 *                 example: 15
 *               description:
 *                 type: string
 *                 maxLength: 256
 *                 example: "Updated subscription"
 *     responses:
 *       200:
 *         description: Recurring expense updated successfully
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
 *                       example: "recurring123"
 *                     amount:
 *                       type: number
 *                       example: 100.50
 *                     categoryId:
 *                       type: string
 *                       example: "cat123"
 *                     category:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Subscriptions"
 *                     recurrenceDay:
 *                       type: number
 *                       example: 15
 *                     description:
 *                       type: string
 *                       example: "Updated subscription"
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
 *                         example: "Invalid input"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: Recurring expense not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recurring expense not found
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
export async function updateRecurringExpense(app: FastifyInstance) {
  app.put(
    '/api/recurring-expenses/:recurringExpenseId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const paramsSchema = z.object({
          recurringExpenseId: z.string()
        })

        const updateRecurringExpenseBody = z.object({
          amount: z.number().optional(),
          categoryId: z.string().optional(),
          recurrenceDay: z.number().min(1).max(31).optional(),
          description: z.string().max(256).optional()
        })

        // Validate request body
        const parsedBody = updateRecurringExpenseBody.safeParse(request.body)
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
            error: 'Invalid recurring expense ID',
            details: parsedParams.error.errors
          })
        }

        const { amount, categoryId, recurrenceDay, description } =
          parsedBody.data
        const { recurringExpenseId } = parsedParams.data

        // Verify if the recurring expense exists and belongs to the user
        const recurringExpense = await prisma.recurringExpense.findFirst({
          where: {
            id: recurringExpenseId,
            userId: authenticatedRequest.userId
          }
        })

        if (!recurringExpense) {
          return reply
            .status(404)
            .send({ error: 'Recurring expense not found' })
        }

        // Update the recurring expense
        const updatedRecurringExpense = await prisma.recurringExpense.update({
          where: { id: recurringExpenseId },
          data: {
            amount,
            categoryId,
            recurrenceDay,
            description
          },
          include: {
            category: {
              select: {
                name: true
              }
            }
          }
        })

        return reply.status(200).send({
          data: {
            id: updatedRecurringExpense.id,
            amount: updatedRecurringExpense.amount,
            categoryId: updatedRecurringExpense.categoryId,
            category: updatedRecurringExpense.category,
            recurrenceDay: updatedRecurringExpense.recurrenceDay,
            description: updatedRecurringExpense.description
          }
        })
      } catch (error) {
        console.error('Error updating recurring expense:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
