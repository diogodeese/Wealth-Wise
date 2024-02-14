import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function getCountries(app: FastifyInstance) {
  app.get(
    '/api/countries',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const countries = await prisma.country.findMany({
        orderBy: { name: 'asc' }
      })

      return reply.status(200).send(countries)
    }
  )
}
