import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export const AuthenticatedRequestSchema = z.object({
  userId: z.string().optional()
})

export type AuthenticatedRequest = z.infer<typeof AuthenticatedRequestSchema> &
  FastifyRequest
