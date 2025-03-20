import { AuthenticatedRequest } from '@Interfaces/request'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { prisma } from '../../../lib/prisma'
import { ErrorHandler } from '../../../utils/error-handling/error-handler'
import ErrorObserver from '../../../utils/error-handling/error-observer'
import { validateToken } from '../../middleware/validate-token'

const createExpenseSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category ID is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  })
})

const createExpenseSchemaJson = zodToJsonSchema(createExpenseSchema)

async function getCategory(categoryId: string) {
  return prisma.expenseCategory.findUnique({
    where: { id: categoryId }
  })
}

async function getTotalExpensesForMonth(categoryId: string): Promise<number> {
  const currentMonthStart = new Date()
  currentMonthStart.setDate(1)
  currentMonthStart.setHours(0, 0, 0, 0)

  const totalExpenses = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: {
      categoryId,
      date: {
        gte: currentMonthStart,
        lte: new Date()
      }
    }
  })
  return totalExpenses._sum.amount ?? 0
}

async function createNewExpense(
  userId: string,
  amount: number,
  description: string,
  categoryId: string,
  date: Date
) {
  return prisma.expense.create({
    data: { userId, amount, description, categoryId, date },
    include: { category: true }
  })
}

async function handleCreateExpense(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { userId } = request as AuthenticatedRequest
    const { amount, description, categoryId, date } = createExpenseSchema.parse(
      request.body
    )
    const parsedDate = new Date(date)

    const [category, currentMonthTotal] = await Promise.all([
      getCategory(categoryId),
      getTotalExpensesForMonth(categoryId)
    ])

    if (!category) {
      return reply.status(404).send({ error: 'Category not found' })
    }

    let warning = ''
    if (category.budgetCap && currentMonthTotal + amount > category.budgetCap) {
      warning = 'You are about to exceed your budget for this category.'
    }

    const expense = await createNewExpense(
      userId,
      amount,
      description,
      categoryId,
      parsedDate
    )

    return reply.status(201).send({
      data: {
        id: expense.id,
        userId: expense.userId,
        categoryId: expense.categoryId,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        createdAt: expense.createdAt,
        warning
      }
    })
  } catch (error) {
    ErrorObserver.notifyAll(error)
    ErrorHandler.handleError(reply, error)
  }
}

export async function createExpense(app: FastifyInstance) {
  app.post(
    '/api/expenses',
    {
      preHandler: [validateToken],
      schema: {
        body: createExpenseSchemaJson
      }
    },
    handleCreateExpense
  )
}
