import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'
dotenv.config()

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh the access token
 *     description: Generate a new access token and refresh token using the refresh token cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your_refresh_token_here"
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tokens refreshed successfully"
 *         setCookie:
 *           - accessToken: { type: string, description: "New JWT access token" }
 *           - refreshToken: { type: string, description: "New JWT refresh token" }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *       401:
 *         description: Invalid or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid refresh token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function refreshToken(app: FastifyInstance) {
  app.post('/api/refresh-token', async (request, reply) => {
    const refreshTokenBody = z.object({
      refreshToken: z.string()
    })

    try {
      const { refreshToken } = refreshTokenBody.parse(request.body)

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

        const newRefreshToken = jwt.sign(
          { userId: decoded.userId },
          jwtSecret,
          {
            expiresIn: jwtRefreshExpiresIn
          }
        )

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

        return reply.status(200).send({
          message: 'Tokens refreshed successfully'
        })
      } catch (error) {
        return reply.status(401).send({ error: 'Invalid refresh token' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: 'Validation failed' })
      }
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}
