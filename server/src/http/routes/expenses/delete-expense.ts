import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/expenses/{expenseId}:
 *   delete:
 *     tags:
 *       - Expenses
 *     summary: Delete an expense
 *     description: Deletes an expense for the authenticated user. Requires a valid token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         description: The ID of the expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully
 *       404:
 *         description: Expense not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Expense not found
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
 *                   example: Internal server error
 */
export async function deleteExpense(app: FastifyInstance) {
  app.delete(
    '/api/expenses/:expenseId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const expenseIdParams = z.object({
          expenseId: z.string()
        })

        // Parse the route parameters using Zod
        const { expenseId } = expenseIdParams.parse(request.params)

        // Check if the expense belongs to the authenticated user
        const expense = await prisma.expense.findUnique({
          where: {
            id: expenseId
          },
          select: {
            userId: true
          }
        })

        if (!expense || expense.userId !== authenticatedRequest.userId) {
          return reply.status(404).send({ error: 'Expense not found' })
        }

        await prisma.expense.delete({
          where: {
            id: expenseId
          }
        })

        return reply.status(200).send({
          message: 'Expense deleted successfully'
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors
          })
        }

        console.error('Error deleting expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
