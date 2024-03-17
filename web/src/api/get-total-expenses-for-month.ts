import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TotalExpensesForMonthResponse {
  totalExpensesForMonth: number
}

export async function getTotalExpensesForMonth(
  month: number,
  year: number
): Promise<number> {
  try {
    const response = await api.get<TotalExpensesForMonthResponse>(
      `/total-expenses-for-month?month=${month}&year=${year}`
    )

    return response.data.totalExpensesForMonth ?? 0
  } catch (error) {
    console.error('Error fetching total expenses for month:', error)
    return 0
  }
}

export const useTotalExpensesForMonth = (month: number, year: number) =>
  useQuery<number>({
    queryKey: ['total-expenses-for-month', month, year],
    queryFn: () => getTotalExpensesForMonth(month, year)
  })
