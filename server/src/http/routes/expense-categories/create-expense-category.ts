import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../interfaces/request'
import { prisma } from '../../lib/prisma'
import { verifyToken } from '../middleware/verify-token'

export async function createExpenseCategory(app: FastifyInstance) {
  app.post(
    '/api/expense-categories',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authenticatedRequest = request as AuthenticatedRequest

        const createExpenseCategoryBody = z.object({
          name: z.string(),
          essential: z.boolean(),
          recurring: z.boolean(),
          description: z.string()
        })

        const { name, essential, recurring, description } =
          createExpenseCategoryBody.parse(request.body)

        // Verify if the user exists
        const userExists = await prisma.user.findUnique({
          where: { id: authenticatedRequest.userId }
        })

        if (!userExists) {
          return reply.status(404).send({ error: 'User not found' })
        }

        const expenseCategory = await prisma.expenseCategory.create({
          data: {
            name,
            essential,
            recurring,
            description
          }
        })

        if (!authenticatedRequest.userId) {
          return reply.status(400).send({ error: 'Invalid user ID' })
        }

        const userExpenseCategory = await prisma.userExpenseCategory.create({
          data: {
            userId: authenticatedRequest.userId,
            expenseCategoryId: expenseCategory.id
          }
        })

        return reply.status(201).send({
          id: expenseCategory.id,
          name: expenseCategory.name,
          essential: expenseCategory.essential,
          recurring: expenseCategory.recurring,
          description: expenseCategory.description
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply
            .status(400)
            .send({ error: 'Validation failed', details: error.errors })
        }

        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
