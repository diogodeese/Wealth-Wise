import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function getCurrencies(app: FastifyInstance) {
  app.get(
    '/api/currencies',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const currencies = await prisma.currency.findMany({
        where: {
          active: true
        },
        orderBy: { name: 'asc' }
      })

      return reply.status(200).send(currencies)
    }
  )
}
