import api from '@/lib/axios'
import CreateExpenseCategoryRequest from '@/types/expense-categories/create-expense-category-request'
import ExpenseCategory from '@/types/expense-categories/expense-category'

export function updateExpenseCategory(
  expenseCategoryId: string,
  data: Partial<CreateExpenseCategoryRequest>
): Promise<ExpenseCategory> {
  return api.put(`/expense-categories/${expenseCategoryId}`, data)
}
