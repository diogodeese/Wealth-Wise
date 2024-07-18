import { z } from 'zod'

const CreateExpenseCategoryRequestSchema = z.object({
  name: z.string(),
  essential: z.boolean(),
  recurring: z.boolean(),
  description: z.string()
})

type CreateExpenseCategoryRequest = z.input<
  typeof CreateExpenseCategoryRequestSchema
>

export default CreateExpenseCategoryRequest
