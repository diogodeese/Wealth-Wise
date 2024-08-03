import { z } from 'zod'

export const ExpenseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  essential: z.boolean().default(false),
  budgetCap: z.number().optional(),
  colorCode: z.string().optional()
})

type ExpenseCategory = z.input<typeof ExpenseCategorySchema>

export default ExpenseCategory
