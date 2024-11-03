import { z } from 'zod'
import { ExpenseCategorySchema } from '../expense-categories/expense-category'

// Define the schema for an Expense
export const ExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  category: ExpenseCategorySchema,
  amount: z.number(),
  description: z.string().optional(),
  date: z.string(), // Keep date as a string to match your data format
  createdAt: z.string().optional() // Change this line if you don't need it
})

// Exporting the type for use elsewhere
export type Expense = z.infer<typeof ExpenseSchema>

export interface ExpensesResponse {
  data: Expense[]
}
