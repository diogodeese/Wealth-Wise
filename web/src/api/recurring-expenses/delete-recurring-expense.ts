import api from '@/lib/axios'

export async function deleteRecurringExpense(
  recurringExpenseId: string
): Promise<string> {
  try {
    await api.delete(`/recurring-expenses/${recurringExpenseId}`)

    return recurringExpenseId
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}
