import api from '@/lib/axios'
import Expense from '@/types/expense'
import { useQuery } from '@tanstack/react-query'

export async function getExpenses(): Promise<Expense[]> {
  return await api.get('/expenses')
}

export const useExpenses = () =>
  useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses
  })
