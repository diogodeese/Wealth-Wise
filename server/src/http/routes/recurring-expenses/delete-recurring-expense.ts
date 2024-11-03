import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/recurring-expenses/{recurringExpenseId}:
 *   delete:
 *     tags:
 *       - Recurring Expenses
 *     summary: Delete a recurring expense
 *     description: Deletes a recurring expense for the authenticated user. Requires a valid token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recurringExpenseId
 *         required: true
 *         description: The ID of the recurring expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurring expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recurring expense deleted successfully
 *       404:
 *         description: Recurring expense not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recurring expense not found
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
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export async function deleteRecurringExpense(app: FastifyInstance) {
  app.delete(
    '/api/recurring-expenses/:recurringExpenseId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const recurringExpenseIdParams = z.object({
          recurringExpenseId: z.string()
        })

        // Validate and parse the recurringExpenseId using Zod
        const { recurringExpenseId } = recurringExpenseIdParams.parse(
          request.params
        )

        // Check if the recurring expense belongs to the authenticated user
        const recurringExpense = await prisma.recurringExpense.findUnique({
          where: {
            id: recurringExpenseId
          },
          select: {
            userId: true
          }
        })

        if (
          !recurringExpense ||
          recurringExpense.userId !== authenticatedRequest.userId
        ) {
          return reply
            .status(404)
            .send({ error: 'Recurring expense not found' })
        }

        // Delete the recurring expense
        await prisma.recurringExpense.delete({
          where: {
            id: recurringExpenseId
          }
        })

        return reply.status(200).send({
          message: 'Recurring expense deleted successfully'
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors
          })
        }

        console.error('Error deleting recurring expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
