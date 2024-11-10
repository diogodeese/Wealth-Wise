import api from '@/lib/axios'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'
import { useQuery } from '@tanstack/react-query'

export async function getRecurringExpenses(): Promise<RecurringExpense[]> {
  const { data } = await api.get<RecurringExpense[]>('/recurring-expenses')

  return data
}

export const useRecurringExpenses = () =>
  useQuery({
    queryKey: ['recurring-expenses'],
    queryFn: () => getRecurringExpenses()
  })
