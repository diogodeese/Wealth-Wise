import { z } from 'zod'
import { ExpenseCategorySchema } from '../expense-categories/expense-category'

const RecurringExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  category: z.lazy(() => ExpenseCategorySchema),
  amount: z.number(),
  description: z.string().optional(),
  recurrenceDay: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

type RecurringExpense = z.input<typeof RecurringExpenseSchema>

export default RecurringExpense
