import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

// Define schemas
const paramsSchema = z.object({
  expenseCategoryId: z.string()
})

const updateExpenseCategoryBody = z.object({
  name: z.string().optional(),
  essential: z.boolean().optional(),
  description: z.string().optional(),
  budgetCap: z.number().optional()
})

export async function updateExpenseCategory(app: FastifyInstance) {
  app.put(
    '/api/expense-categories/:expenseCategoryId',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

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
          },
          include: {
            expenseCategory: true
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
          id: updatedExpenseCategory.id,
          name: updatedExpenseCategory.name,
          essential: updatedExpenseCategory.essential,
          description: updatedExpenseCategory.description,
          budgetCap: updatedExpenseCategory.budgetCap
        })
      } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
