import { z } from 'zod'

const CountrySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string()
})

type Country = z.input<typeof CountrySchema>

export default Country
