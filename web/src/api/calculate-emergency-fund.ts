import api from '@/lib/axios'

export async function calculateEmergencyFund(): Promise<number> {
  try {
    const response = await api.post('/emergency-fund')

    return response.data
  } catch (error) {
    console.error('Error verifying token:', error)

    return 0
  }
}
