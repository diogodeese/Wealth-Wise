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
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, 'Month must be between 1 and 12'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a valid four-digit number')
})

// Convert Zod schema to JSON schema for Fastify
const querySchemaJson = zodToJsonSchema(querySchema)

// Fetch total expenses for a given month and year
async function fetchTotalExpensesForMonth(
  userId: string,
  month: number,
  year: number
): Promise<number> {
  const startDate = new Date(year, month - 1, 1, 0, 0, 0)
  const endDate = new Date(year, month, 0, 23, 59, 59)

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
async function handleGetTotalExpensesForMonth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const query = querySchema.parse(request.query) // Validate query params
    const { userId } = request as AuthenticatedRequest

    if (!userId) {
      return reply.status(401).send({ error: 'User not authenticated' })
    }

    const month = Number(query.month)
    const year = Number(query.year)

    const totalExpensesForMonth = await fetchTotalExpensesForMonth(
      userId,
      month,
      year
    )

    return reply.status(200).send({
      data: {
        totalExpensesForMonth: parseFloat(totalExpensesForMonth.toFixed(2))
      }
    })
  } catch (error) {
    ErrorHandler.handleError(reply, error)
  }
}

// Register the route with Fastify
export async function getTotalExpensesForMonth(app: FastifyInstance) {
  app.get(
    '/api/total-expenses-for-month',
    {
      preHandler: [validateToken],
      schema: {
        querystring: querySchemaJson
      }
    },
    handleGetTotalExpensesForMonth
  )
}
