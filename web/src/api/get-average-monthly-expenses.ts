import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface ExpenseByMonth {
  date: string
  amount: number
}

interface TotalExpensesData {
  totalExpensesByMonth: ExpenseByMonth[]
  averageTotalAmount: number
}

export async function getTotalExpensesWithAverageLastYear(): Promise<TotalExpensesData> {
  return await api.get('/total-expenses-with-average-last-twelve-months')
}

export const useTotalExpensesWithAverageLastTwelveMonths = () =>
  useQuery({
    queryKey: ['total-expenses-with-average-last-twelve-months'],
    queryFn: getTotalExpensesWithAverageLastYear
  })
