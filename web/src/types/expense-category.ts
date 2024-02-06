import { z } from 'zod'

const ExpenseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
})

type ExpenseCategory = z.input<typeof ExpenseCategorySchema>

export default ExpenseCategory
