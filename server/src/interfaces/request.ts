import { FastifyRequest } from 'fastify'

export interface AuthenticatedRequest extends FastifyRequest {
  userId: string
}
