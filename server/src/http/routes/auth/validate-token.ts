import dotenv from 'dotenv'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

dotenv.config()

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
