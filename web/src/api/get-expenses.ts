import api from '@/lib/axios'
import Expense from '@/types/expense'
import { useQuery } from '@tanstack/react-query'

export async function getExpenses(
  from?: string,
  to?: string,
  categories?: string[]
): Promise<Expense[]> {
  const params = new URLSearchParams()
  if (from) params.append('from', from)
  if (to) params.append('to', to)
  if (categories && categories.length > 0)
    params.append('categories', categories.join(','))

  return await api.get('/expenses', { params })
}

export const useExpenses = (
  from?: string,
  to?: string,
  categories?: string[]
) =>
  useQuery({
    queryKey: ['expenses', from, to, categories],
    queryFn: () => getExpenses(from, to, categories)
  })
