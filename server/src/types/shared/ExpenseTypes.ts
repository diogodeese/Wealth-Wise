import { ExpenseSchema } from '@Prisma/generated/zod'
import { z } from 'zod'

export type Expense = z.infer<typeof ExpenseSchema>

export const expenseWithoutIdsSchema = ExpenseSchema.omit({
  userId: true
})
export type ExpenseWithoutIds = z.infer<typeof expenseWithoutIdsSchema>

export const CreateExpenseRequestSchema = ExpenseSchema.pick({
  amount: true,
  categoryId: true,
  description: true,
  date: true
}).extend({
  description: ExpenseSchema.shape.description.optional()
})
export type CreateExpenseRequest = z.input<typeof CreateExpenseRequestSchema>
