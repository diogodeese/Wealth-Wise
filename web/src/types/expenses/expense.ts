import { z } from 'zod'
import { ExpenseCategorySchema } from '../expense-categories/expense-category'

const ExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  category: z.lazy(() => ExpenseCategorySchema),
  amount: z.number(),
  description: z.string().optional(),
  date: z.date(),
  createdAt: z.date().optional()
})

type Expense = z.input<typeof ExpenseSchema>

export default Expense
