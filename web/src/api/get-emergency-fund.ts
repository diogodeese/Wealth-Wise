import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface EmergencyFundParams {
  fundMonths?: number | null
  essentialsOnly?: boolean | null
  averageMonths?: number | null
}

interface EmergencyFundResponse {
  averageTotalAmount: number
  emergencyFund: number
}

export async function getEmergencyFund(
  params: EmergencyFundParams = {}
): Promise<EmergencyFundResponse> {
  try {
    const queryParams = new URLSearchParams()

    if (params.fundMonths !== undefined && params.fundMonths !== null)
      queryParams.append('fundMonths', params.fundMonths.toString())
    if (params.essentialsOnly !== undefined && params.essentialsOnly !== null)
      queryParams.append('essentialsOnly', params.essentialsOnly.toString())
    if (params.averageMonths !== undefined && params.averageMonths !== null)
      queryParams.append('averageMonths', params.averageMonths.toString())

    const { data } = await api.get<EmergencyFundResponse>(
      `/emergency-fund?${queryParams.toString()}`
    )
    // Check if data is defined
    if (!data) {
      console.error('Response data is undefined')
      throw new Error('Response data is undefined')
    }

    return data
  } catch (error) {
    console.error('Error fetching emergency fund:', error)
    throw error
  }
}

export const useEmergencyFund = (params: EmergencyFundParams = {}) =>
  useQuery({
    queryKey: [
      'emergency-fund',
      params.fundMonths,
      params.essentialsOnly,
      params.averageMonths
    ],
    queryFn: () => getEmergencyFund(params)
  })
