import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

// Define schemas
const paramsSchema = z.object({
  recurringExpenseId: z.string()
})

const updateRecurringExpenseBody = z.object({
  amount: z.number().optional(),
  categoryId: z.string().optional(),
  recurrenceDay: z.number().min(1).max(31).optional(),
  description: z.string().max(256).optional()
})

export async function updateRecurringExpense(app: FastifyInstance) {
  app.put(
    '/api/recurring-expenses/:recurringExpenseId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

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
            category: true
          }
        })

        return reply.status(200).send({
          id: updatedRecurringExpense.id,
          amount: updatedRecurringExpense.amount,
          categoryId: updatedRecurringExpense.categoryId,
          category: updatedRecurringExpense.category,
          recurrenceDay: updatedRecurringExpense.recurrenceDay,
          description: updatedRecurringExpense.description
        })
      } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
