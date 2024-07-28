import api from '@/lib/axios'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'
import { useQuery } from '@tanstack/react-query'

export async function getRecurringExpenses(): Promise<RecurringExpense[]> {
  return await api.get('/recurring-expenses')
}

export const useRecurringExpenses = () =>
  useQuery({
    queryKey: ['recurring-expenses'],
    queryFn: () => getRecurringExpenses()
  })
