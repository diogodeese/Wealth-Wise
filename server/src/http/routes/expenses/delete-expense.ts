import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

const paramsSchema = z.object({
  expenseId: z.string()
})

export async function deleteExpense(app: FastifyInstance) {
  app.delete(
    '/api/expenses/:id',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      try {
        const { expenseId } = paramsSchema.parse(request.params)

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

        return reply.status(204).send()
      } catch (error) {
        console.error('Error deleting expense:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
