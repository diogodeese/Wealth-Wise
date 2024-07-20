import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

const paramsSchema = z.object({
  id: z.string()
})

export async function deleteExpenseCategory(app: FastifyInstance) {
  app.delete(
    '/api/expense-categories/:id',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      try {
        const { id } = paramsSchema.parse(request.params)

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

        return reply.status(204).send()
      } catch (error) {
        console.error('Error deleting expense category:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
