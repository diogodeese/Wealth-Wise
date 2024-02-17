import api from '@/lib/axios'
import CreateExpenseRequest from '@/types/create-expense-request'
import Expense from '@/types/expense'

export async function createExpense(
  data: CreateExpenseRequest
): Promise<Expense> {
  return await api.post('/expenses', data)
}

// export const CreateExpense = () => {

// }
