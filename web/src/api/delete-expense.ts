import api from '@/lib/axios'

export async function deleteExpense(expenseId: string): Promise<string> {
  try {
    await api.delete(`/expenses/${expenseId}`)

    return expenseId
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}
