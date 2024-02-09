import { z } from 'zod'

export const ExpenseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
})

type ExpenseCategory = z.input<typeof ExpenseCategorySchema>

export default ExpenseCategory
