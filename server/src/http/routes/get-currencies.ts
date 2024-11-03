import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

/**
 * @swagger
 * /api/currencies:
 *   get:
 *     tags:
 *       - Reference Data
 *     summary: Retrieve a list of currencies
 *     description: Retrieves all active currencies from the database, ordered alphabetically by name.
 *     responses:
 *       200:
 *         description: List of active currencies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "USD"
 *                   name:
 *                     type: string
 *                     example: "United States Dollar"
 *                   symbol:
 *                     type: string
 *                     example: "$"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function getCurrencies(app: FastifyInstance) {
  app.get(
    '/api/currencies',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const currencies = await prisma.currency.findMany({
          where: {
            active: true
          },
          orderBy: { name: 'asc' }
        })

        return reply.status(200).send({ data: currencies })
      } catch (error) {
        console.error('Error fetching currencies:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
