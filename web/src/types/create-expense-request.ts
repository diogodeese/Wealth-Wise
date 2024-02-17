import { z } from 'zod'

const CreateExpenseRequestSchema = z.object({
  amount: z.number(),
  categoryId: z.string(),
  description: z.string().optional(),
  currency: z.string().optional(),
  location: z.string().optional(),
  receipt: z.string().optional(),
  date: z.date()
})

type CreateExpenseRequest = z.input<typeof CreateExpenseRequestSchema>

export default CreateExpenseRequest
