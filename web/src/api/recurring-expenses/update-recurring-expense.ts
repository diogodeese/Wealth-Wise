import api from '@/lib/axios'
import CreateRecurringExpenseRequest from '@/types/recurring-expenses/create-recurring-expense-request'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'

export function updateRecurringExpense(
  recurringExpenseId: string,
  data: Partial<CreateRecurringExpenseRequest>
): Promise<RecurringExpense> {
  return api.put(`/recurring-expenses/${recurringExpenseId}`, data)
}
