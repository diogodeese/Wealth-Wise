import { jwtDecode, JwtPayload } from 'jwt-decode'
import { getAccessToken } from './get-tokens'
import { refreshAccessToken } from './refresh-access-token'

interface DecodedToken extends JwtPayload {
  exp: number
}

export async function isAuthenticated(): Promise<boolean> {
  let token = getAccessToken()

  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token)
    const expirationTime = decodedToken.exp * 1000
    const timeUntilExpiration = expirationTime - Date.now()

    if (timeUntilExpiration < 360000 && timeUntilExpiration > 0) {
      try {
        token = await refreshAccessToken()
        return !!token
      } catch (error) {
        console.error('Failed to refresh token:', error)
        return false
      }
    }
    return true
  }
  return false
}
