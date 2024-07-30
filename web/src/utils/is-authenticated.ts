import api from '@/lib/axios'
import { isErrorResponse } from './error-handler'

export async function isAuthenticated(): Promise<boolean> {
  try {
    await api.get('/validate-token')
    return true
  } catch (error) {
    if (
      isErrorResponse(error) &&
      error.response?.data.error === 'Unauthorized'
    ) {
      return false
    }
    throw error
  }
}
