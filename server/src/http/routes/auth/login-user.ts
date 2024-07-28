import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
dotenv.config()

export async function loginUser(app: FastifyInstance) {
  app.post(
    '/api/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const loginBody = z.object({
        email: z.string(),
        password: z.string()
      })

      const { email, password } = loginBody.parse(request.body)

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return reply.code(401).send({ message: 'Invalid credentials' })
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        return reply.code(401).send({ message: 'Invalid credentials' })
      }

      const userId = user.id

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

      reply.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600 * 1000 // 1 hour
      })
      reply.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 3600 * 1000 // 30 days
      })

      reply.status(200).send({
        data: {
          message: 'Logged in successfully',
          accessToken,
          refreshToken
        }
      })
    }
  )
}
