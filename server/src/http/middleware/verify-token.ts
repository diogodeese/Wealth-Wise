import dotenv from 'dotenv'
import { FastifyReply } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthenticatedRequest } from '../../interfaces/request'
dotenv.config()

export function verifyToken(
  request: AuthenticatedRequest,
  reply: FastifyReply,
  done: Function
) {
  const token = request.cookies.accessToken

  if (!token) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload
    request.userId = decodedToken.userId
    done()
  } catch (error) {
    return reply.code(401).send({ message: 'Unauthorized' })
  }
}
