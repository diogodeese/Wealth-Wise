import { z } from 'zod'

const CurrencySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional()
})

type Currency = z.input<typeof CurrencySchema>

export default Currency
