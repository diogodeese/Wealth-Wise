import api from '@/lib/axios'
import CreateExpenseCategoryRequest from '@/types/expense-categories/create-expense-category-request'
import ExpenseCategory from '@/types/expense-categories/expense-category'

export function createExpenseCategory(
  data: CreateExpenseCategoryRequest
): Promise<ExpenseCategory> {
  return api.post('/expense-categories', data)
}
