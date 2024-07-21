import { regenerateToken } from '@/api/auth/regenerate-token'
import { verifyToken } from '@/api/auth/verify-token'
import { decodeToken } from './decode-token'
import { getToken } from './get-token'
import { setToken } from './set-token'

export async function isAuthenticated(): Promise<boolean> {
  const token = getToken()

  if (token) {
    const isValid = await verifyToken()

    if (isValid) {
      const decodedToken = decodeToken(token)
      const expirationTime = decodedToken.exp * 1000
      const timeUntilExpiration = expirationTime - Date.now()

      if (timeUntilExpiration < 3600000) {
        // 3600000 milliseconds = 1 hour
        // Token is close to expiring, regenerate it
        const newToken = await regenerateToken()
        if (newToken) {
          setToken(newToken)
        }
      }
      return true
    }
  }
  return false
}
