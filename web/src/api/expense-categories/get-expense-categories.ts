import api from '@/lib/axios'
import ExpenseCategory from '@/types/expense-categories/expense-category'
import { useQuery } from '@tanstack/react-query'

export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  return await api.get('/expense-categories')
}

export const useExpenseCategories = () =>
  useQuery({
    queryKey: ['expense-categories'],
    queryFn: getExpenseCategories
  })
