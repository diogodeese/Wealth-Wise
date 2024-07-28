import { z } from 'zod'

const CreateRecurringExpenseRequestSchema = z.object({
  amount: z.number(),
  categoryId: z.string(),
  description: z.string().optional(),
  recurrenceDay: z.number()
})

type CreateRecurringExpenseRequest = z.input<
  typeof CreateRecurringExpenseRequestSchema
>

export default CreateRecurringExpenseRequest
