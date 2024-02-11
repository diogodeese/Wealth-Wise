import api from '@/lib/axios'

export async function regenerateToken(): Promise<string | null> {
  try {
    const response = await api.get('/regenerate-token')

    return response.data.token
  } catch (error) {
    console.error('Error regenerating token:', error)

    return null
  }
}
