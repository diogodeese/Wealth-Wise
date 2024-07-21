import api from '@/lib/axios'

export async function deleteExpenseCategory(
  expenseCategoryId: string
): Promise<string> {
  try {
    await api.delete(`/expense-categories/${expenseCategoryId}`)

    return expenseCategoryId
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}
