import api from '@/lib/axios'
import CreateRecurringExpenseRequest from '@/types/recurring-expenses/create-recurring-expense-request'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'

export async function createRecurringExpense(
  data: CreateRecurringExpenseRequest
): Promise<RecurringExpense> {
  return await api.post('/api/recurring-expenses', data)
}
