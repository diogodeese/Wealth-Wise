import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function getExpenseCategories(app: FastifyInstance) {
  app.get(
    '/expense-categories',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const expenseCategories = await prisma.expenseCategory.findMany()

      return reply.status(200).send({ expenseCategories })
    }
  )
}
