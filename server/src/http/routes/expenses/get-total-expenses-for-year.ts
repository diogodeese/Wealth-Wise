import { AuthenticatedRequest } from '@Interfaces/request'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { prisma } from '../../../lib/prisma'
import { ErrorHandler } from '../../../utils/error-handling/error-handler'
import ErrorObserver from '../../../utils/error-handling/error-observer'
import { validateToken } from '../../middleware/validate-token'

// Define Zod schema for query parameters
const querySchema = z.object({
  year: z.string().regex(/^\d{4}$/, 'Year must be a valid four-digit number')
})

// Convert Zod schema to JSON schema
const querySchemaJson = zodToJsonSchema(querySchema)

// Fetch total expenses for the given year
async function fetchTotalExpensesForYear(
  userId: string,
  year: number
): Promise<number> {
  const startDate = new Date(year, 0, 1, 0, 0, 0)
  const endDate = new Date(year, 11, 31, 23, 59, 59)

  try {
    // Retrieve total expenses sum directly using Prisma aggregation
    const totalExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        date: { gte: startDate, lte: endDate }
      }
    })

    return totalExpenses._sum.amount ?? 0
  } catch (error) {
    ErrorObserver.notifyAll(error)
    throw error
  }
}

// Handler function for the route
async function handleGetTotalExpensesForYear(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const query = querySchema.parse(request.query) // Validate request query params
    const { userId } = request as AuthenticatedRequest

    if (!userId) {
      return reply.status(401).send({ error: 'User not authenticated' })
    }

    const year = Number(query.year)
    const totalExpensesForYear = await fetchTotalExpensesForYear(userId, year)

    return reply.status(200).send({
      data: {
        totalExpensesForYear: parseFloat(totalExpensesForYear.toFixed(2))
      }
    })
  } catch (error) {
    ErrorHandler.handleError(reply, error)
  }
}

export async function getTotalExpensesForYear(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-year',
    {
      preHandler: [validateToken],
      schema: {
        querystring: querySchemaJson
      }
    },
    handleGetTotalExpensesForYear
  )
}
