import { z } from 'zod'

const CreateExpenseCategoryRequestSchema = z.object({
  name: z.string(),
  description: z.string()
})

type CreateExpenseCategoryRequest = z.input<
  typeof CreateExpenseCategoryRequestSchema
>

export default CreateExpenseCategoryRequest
