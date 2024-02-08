import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }

  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' })
}
