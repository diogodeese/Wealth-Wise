import api from '@/lib/axios'
import { CreateExpenseRequest, Expense } from '@Types/ExpenseTypes'

export async function createExpense(
  data: CreateExpenseRequest
): Promise<Expense> {
  return await api.post('/expenses', data)
}
