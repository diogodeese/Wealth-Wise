import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags:
 *       - Reference Data
 *     summary: Retrieve a list of countries
 *     description: Retrieves all countries from the database, ordered alphabetically by name.
 *     responses:
 *       200:
 *         description: List of countries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "United States"
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
export async function getCountries(app: FastifyInstance) {
  app.get(
    '/api/countries',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const countries = await prisma.country.findMany({
          orderBy: { name: 'asc' }
        })

        return reply.status(200).send({ data: countries })
      } catch (error) {
        console.error('Error fetching countries:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
