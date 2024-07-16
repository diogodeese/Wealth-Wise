import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function createExpenseCategory(app: FastifyInstance) {
  app.post(
    '/api/expense-categories',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const createExpenseCategoryBody = z.object({
        name: z.string(),
        description: z.string()
      })

      const { name, description } = createExpenseCategoryBody.parse(
        request.body
      )

      const expenseCategory = await prisma.expenseCategory.create({
        data: {
          name: name,
          description: description
        }
      })

      return reply
        .status(201)
        .send({
          id: expenseCategory.id,
          name: expenseCategory.name,
          description: expenseCategory.description
        })
    }
  )
}
