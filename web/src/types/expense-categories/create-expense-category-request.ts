import { z } from 'zod'

const CreateExpenseCategoryRequestSchema = z.object({
  name: z.string(),
  essential: z.boolean(),
  description: z.string(),
  budgetCap: z.number().optional()
})

type CreateExpenseCategoryRequest = z.input<
  typeof CreateExpenseCategoryRequestSchema
>

export default CreateExpenseCategoryRequest
