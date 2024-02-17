import api from '@/lib/axios'
import CreateExpenseRequest from '@/types/create-expense-request'
import Currency from '@/types/currency'

export async function createExpense(
  data: CreateExpenseRequest
): Promise<Currency[]> {
  return await api.post('/expenses', data)
}

// export const CreateExpense = () => {

// }
