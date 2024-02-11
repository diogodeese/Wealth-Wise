import dotenv from 'dotenv'
import { FastifyReply } from 'fastify'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { AuthenticatedRequest } from '../../interfaces/request'
dotenv.config()

export function verifyToken(
  request: AuthenticatedRequest,
  reply: FastifyReply,
  done: Function
) {
  const token = request.headers['authorization']?.replace('Bearer ', '')

  if (!token) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }

  let decodedToken: (Jwt & JwtPayload) | undefined

  try {
    decodedToken = jwt.verify(token, jwtSecret) as Jwt & JwtPayload
  } catch (error) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }

  if (!decodedToken) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }

  request.userId = decodedToken.userId
  return done()
}
