import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function getExpenses(app: FastifyInstance) {
  app.get('/expenses', async (request: FastifyRequest, reply: FastifyReply) => {
    const expenses = await prisma.expense.findMany()

    return reply.status(200).send({ expenses })
  })
}
