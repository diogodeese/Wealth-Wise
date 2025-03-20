import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { deleteExpenseDocs } from '../../../docs/expenses/delete-expense-docs'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { ErrorHandler } from '../../../utils/error-handling/error-handler'
import ErrorObserver from '../../../utils/error-handling/error-observer'
import { validateToken } from '../../middleware/validate-token'

const expenseIdSchema = z.object({
  expenseId: z.string()
})

async function getExpense(expenseId: string) {
  return prisma.expense.findUnique({
    where: { id: expenseId },
    select: { userId: true }
  })
}

async function removeExpense(expenseId: string) {
  await prisma.expense.delete({ where: { id: expenseId } })
}

async function handleDeleteExpense(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const { expenseId } = expenseIdSchema.parse(request.params)
    const { userId } = request as AuthenticatedRequest

    const expense = await getExpense(expenseId)

    if (!expense || expense.userId !== userId) {
      return reply.status(404).send({ error: 'Expense not found' })
    }

    await removeExpense(expenseId)

    reply.status(204).send()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: 'Validation failed',
        details: error.errors
      })
    }

    ErrorObserver.notifyAll(error)
    ErrorHandler.handleError(reply, error)
  }
}

export async function deleteExpense(app: FastifyInstance) {
  app.delete(
    '/api/expenses/:expenseId',
    {
      preHandler: [validateToken],
      schema: {
        params: {
          type: 'object',
          required: ['expenseId'],
          properties: {
            expenseId: { type: 'string' }
          }
        },
        response: deleteExpenseDocs.responses
      }
    },
    handleDeleteExpense
  )
}
