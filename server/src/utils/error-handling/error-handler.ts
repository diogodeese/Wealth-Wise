import { FastifyError } from '@fastify/error'
import { Prisma } from '@prisma/client'
import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export interface ErrorResponse {
  error: string
  details?: any
}

export class ErrorHandler {
  static handleError(
    reply: FastifyReply,
    error: unknown,
    statusCode = 500
  ): void {
    if (error instanceof ZodError) {
      reply.status(400).send({
        error: 'Validation failed',
        details: error.errors.map((e) => ({
          message: e.message,
          path: e.path
        }))
      })
      return
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': // Unique constraint failed
          reply.status(409).send({ error: 'Conflict: Duplicate entry' })
          return
        case 'P2025': // Record not found
          reply.status(404).send({ error: 'Resource not found' })
          return
        default:
          reply
            .status(500)
            .send({ error: 'Database error', details: error.message })
          return
      }
    }

    // Check if error matches FastifyError structure
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      reply
        .status((error as FastifyError).statusCode || 500)
        .send({ error: (error as FastifyError).message })
      return
    }

    if (error instanceof Error) {
      reply
        .status(statusCode)
        .send({ error: error.message || 'Internal server error' })
      return
    }

    console.error('Unhandled error:', error)
    reply.status(500).send({ error: 'Internal server error' })
  }

  static notifyError(observer: (error: unknown) => void, error: unknown): void {
    observer(error)
  }
}
