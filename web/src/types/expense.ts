import { z } from 'zod'
import { ExpenseCategorySchema } from './expense-category'

const ExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  category: z.lazy(() => ExpenseCategorySchema),
  amount: z.number(),
  description: z.string().optional(),
  currency: z.string().optional(),
  location: z.string().optional(),
  receipt: z.string().optional(),
  date: z.date(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})

type Expense = z.input<typeof ExpenseSchema>

export default Expense
