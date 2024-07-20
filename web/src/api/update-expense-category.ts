import api from '@/lib/axios'
import CreateExpenseCategoryRequest from '@/types/create-expense-category-request'
import ExpenseCategory from '@/types/expense-category'

export function updateExpenseCategory(
  expenseCategoryId: string,
  data: Partial<CreateExpenseCategoryRequest>
): Promise<ExpenseCategory> {
  return api.put(`/expense-categories/${expenseCategoryId}`, data)
}
