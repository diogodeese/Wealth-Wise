import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import jwt from 'jsonwebtoken'

dotenv.config()

export async function verifyToken(app: FastifyInstance) {
  app.get('/verify-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .send({ message: 'No token provided', valid: false })
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables')
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token', valid: false })
      }

      res.status(200).send({ data: { message: 'Token is valid', valid: true } })
    })
  })
}
