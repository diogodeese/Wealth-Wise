import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
dotenv.config()

export async function regenerateToken(app: FastifyInstance) {
  app.get('/api/regenerate-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN

    if (!token) {
      return res.status(401).send({ message: 'No token provided' })
    }

    if (!jwtSecret || !jwtExpiresIn) {
      throw new Error(
        'JWT_SECRET or JWT_EXPIRES_IN is not defined in the environment variables'
      )
    }

    let decodedToken: (Jwt & JwtPayload) | undefined
    decodedToken = jwt.verify(token, jwtSecret) as Jwt & JwtPayload
    jwt.verify(token, jwtSecret) as Jwt & JwtPayload
    const { userId } = decodedToken

    const newToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: jwtExpiresIn
    })

    res
      .status(200)
      .send({ data: { message: 'Token regenerated', token: newToken } })
  })
}
