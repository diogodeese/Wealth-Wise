import { AuthenticatedRequest } from '@Interfaces/request'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { prisma } from '../../../lib/prisma'
import { ErrorHandler } from '../../../utils/error-handling/error-handler'
import ErrorObserver from '../../../utils/error-handling/error-observer'
import { validateToken } from '../../middleware/validate-token'

const querySchema = z.object({
  categories: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional()
})

const querySchemaJson = zodToJsonSchema(querySchema)

interface WhereCondition {
  userId: string
  categoryId?: { in: string[] }
  date?: { gte?: Date; lte?: Date }
}

function buildWhereCondition(
  query: z.infer<typeof querySchema>,
  userId: string
): WhereCondition {
  const whereCondition: WhereCondition = { userId }

  if (query.categories) {
    whereCondition.categoryId = { in: query.categories.split(',') }
  }

  if (query.from && query.to) {
    whereCondition.date = { gte: new Date(query.from), lte: new Date(query.to) }
  }

  return whereCondition
}

async function handleGetExpenses(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const query = querySchema.parse(request.query)
    const { userId } = request as AuthenticatedRequest

    const whereCondition = buildWhereCondition(query, userId)

    const expenses = await prisma.expense.findMany({
      where: whereCondition,
      include: { category: { select: { name: true } } },
      orderBy: { date: 'desc' }
    })

    const transformedExpenses = expenses.map(
      (expense: { userId: string; [key: string]: any }) => {
        const { userId, ...rest } = expense
        return rest
      }
    )

    reply.status(200).send({ data: transformedExpenses })
  } catch (error) {
    ErrorObserver.notifyAll(error)
    ErrorHandler.handleError(reply, error)
  }
}

export async function getExpenses(app: FastifyInstance): Promise<void> {
  app.get(
    '/api/expenses',
    {
      preHandler: [validateToken],
      schema: {
        querystring: querySchemaJson
      }
    },
    handleGetExpenses
  )
}
