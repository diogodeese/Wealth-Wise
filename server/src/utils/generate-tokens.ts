import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function generateTokens(userId: string) {
  const jwtSecret = process.env.JWT_SECRET
  const jwtAccessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN
  const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN

  if (!jwtSecret || !jwtAccessExpiresIn || !jwtRefreshExpiresIn) {
    throw new Error(
      'JWT_SECRET, JWT_ACCESS_EXPIRES_IN or JWT_REFRESH_EXPIRES_IN is not defined in the environment variables'
    )
  }

  const accessToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtAccessExpiresIn
  })

  const refreshToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtRefreshExpiresIn
  })

  return { accessToken, refreshToken }
}
