import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TotalExpensesForYearResponse {
  totalExpensesForYear: number
}

export async function getTotalExpensesForYear(year: number): Promise<number> {
  try {
    const response = await api.get<TotalExpensesForYearResponse>(
      `/total-expenses-for-year?year=${year}`
    )
    return response.data.totalExpensesForYear ?? 0
  } catch (error) {
    console.error('Error fetching total expenses for year:', error)
    return 0
  }
}

export const useTotalExpensesForYear = (year: number) =>
  useQuery<number>({
    queryKey: ['total-expenses-for-year', year],
    queryFn: () => getTotalExpensesForYear(year)
  })
