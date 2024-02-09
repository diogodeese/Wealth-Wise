import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN

  if (!jwtSecret || !jwtExpiresIn) {
    throw new Error(
      'JWT_SECRET or JWT_EXPIRES_IN is not defined in the environment variables'
    )
  }

  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiresIn })
}
