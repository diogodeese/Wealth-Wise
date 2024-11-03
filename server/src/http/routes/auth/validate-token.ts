import dotenv from 'dotenv'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
dotenv.config()

/**
 * @swagger
 * /api/validate-token:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Validate access token
 *     description: Validates the JWT access token stored in cookies.
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *       401:
 *         description: Unauthorized - token is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server configuration error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server configuration error
 */
export async function validateToken(app: FastifyInstance) {
  app.get(
    '/api/validate-token',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const jwtSecret = process.env.JWT_SECRET

      if (!jwtSecret) {
        return reply.code(500).send({ message: 'Server configuration error' })
      }

      try {
        // Extract token from cookies
        const token = request.cookies['accessToken']
        if (!token) {
          throw new Error('No token provided')
        }

        // Verify the token
        jwt.verify(token, jwtSecret)

        // Token is valid
        reply.send({ message: 'Token is valid' })
      } catch (error) {
        // Token is invalid or expired
        reply.code(401).send({ message: 'Unauthorized' })
      }
    }
  )
}
