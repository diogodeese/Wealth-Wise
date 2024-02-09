import api from '@/lib/axios'

export async function verifyToken(): Promise<boolean> {
  try {
    const response = await api.get('/verify-token')

    return response.data.valid === true
  } catch (error) {
    console.error('Error verifying token:', error)

    return false
  }
}
