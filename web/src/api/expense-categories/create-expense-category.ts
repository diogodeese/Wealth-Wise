import api from '@/lib/axios'
import CreateExpenseCategoryRequest from '@/types/create-expense-category-request'
import ExpenseCategory from '@/types/expense-category'

export function createExpenseCategory(
  data: CreateExpenseCategoryRequest
): Promise<ExpenseCategory> {
  return api.post('/expense-categories', data)
}
