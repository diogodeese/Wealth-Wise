import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'
dotenv.config()

export async function refreshToken(app: FastifyInstance) {
  app.post('/api/refresh-token', (request, reply) => {
    const { refreshToken } = request.cookies

    if (!refreshToken) {
      return reply.status(401).send({ message: 'No refresh token provided' })
    }

    const jwtSecret = process.env.JWT_SECRET
    const jwtAccessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN
    const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN

    if (!jwtSecret || !jwtAccessExpiresIn || !jwtRefreshExpiresIn) {
      throw new Error('JWT environment variables are not defined')
    }

    try {
      const decoded = jwt.verify(refreshToken, jwtSecret) as JwtPayload

      const newAccessToken = jwt.sign({ userId: decoded.userId }, jwtSecret, {
        expiresIn: jwtAccessExpiresIn
      })

      const newRefreshToken = jwt.sign({ userId: decoded.userId }, jwtSecret, {
        expiresIn: jwtRefreshExpiresIn
      })

      console.log('Refresh Success')

      reply.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 1000,
        path: '/'
      })

      reply.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 3600 * 1000,
        path: '/'
      })
    } catch (error) {
      return reply.status(401).send({ message: 'Invalid refresh token' })
    }
  })
}
