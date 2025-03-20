import { AuthenticatedRequest } from '@Interfaces/request'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

export function validateToken(
  request: FastifyRequest,
  reply: FastifyReply,
  done: Function
) {
  const token = request.cookies?.accessToken

  if (!token) {
    return reply.code(401).send({ message: 'User not authenticated' })
  }

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload

    // Validate the userId
    const userIdSchema = z.string().uuid()
    const userId = userIdSchema.parse(decodedToken.userId)

    // Attach validated `userId` to the request
    ;(request as AuthenticatedRequest).userId = userId

    done()
  } catch (error) {
    return reply.code(401).send({ message: 'User not authenticated' })
  }
}
