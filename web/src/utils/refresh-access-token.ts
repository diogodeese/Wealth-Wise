import api from '@/lib/axios'
import { getRefreshToken } from './get-tokens'
import { setTokens } from './set-tokens'

export async function refreshAccessToken(): Promise<string | undefined> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await api.post(
      '/refresh-token',
      { refreshToken },
      { withCredentials: true }
    )
    const { accessToken, newRefreshToken } = response.data
    setTokens(accessToken, newRefreshToken)
    return accessToken
  } catch (error) {
    console.error('Failed to refresh access token:', error)
    return undefined
  }
}
