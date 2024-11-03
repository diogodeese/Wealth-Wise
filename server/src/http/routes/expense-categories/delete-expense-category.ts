import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   delete:
 *     tags:
 *       - Expense Categories
 *     summary: Delete an expense category
 *     description: Deletes an expense category if it belongs to the authenticated user and is not in use by any expenses.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the expense category to delete
 *         example: 1234
 *     responses:
 *       204:
 *         description: Expense category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense category deleted successfully
 *       400:
 *         description: Expense category is in use and cannot be deleted or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Expense category cannot be deleted because it is in use
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Invalid ID format
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: Expense category not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Expense category not found or does not belong to user
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
export async function deleteExpenseCategory(app: FastifyInstance) {
  app.delete(
    '/api/expense-categories/:id',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const expenseIdParams = z.object({
          id: z.string().uuid()
        })

        const { id } = expenseIdParams.parse(request.params)

        // Check if the expense category belongs to the authenticated user
        const userExpenseCategory = await prisma.userExpenseCategory.findFirst({
          where: {
            userId: authenticatedRequest.userId,
            expenseCategoryId: id
          }
        })

        if (!userExpenseCategory) {
          return reply.status(404).send({
            error: 'Expense category not found or does not belong to user'
          })
        }

        // Check if the expense category is in use
        const expenseInUse = await prisma.expense.findFirst({
          where: {
            categoryId: id
          }
        })

        if (expenseInUse) {
          return reply.status(400).send({
            error: 'Expense category cannot be deleted because it is in use'
          })
        }

        // Delete the userExpenseCategory entry
        await prisma.userExpenseCategory.deleteMany({
          where: {
            expenseCategoryId: id
          }
        })

        // Delete the expense category
        await prisma.expenseCategory.delete({
          where: {
            id: id
          }
        })

        return reply.status(204).send({
          message: 'Expense category deleted successfully'
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors
          })
        }
        console.error('Error deleting expense category:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
