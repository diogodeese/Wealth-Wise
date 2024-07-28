import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
import { generateTokens } from '../../../utils/generate-tokens'

export async function registerUser(app: FastifyInstance) {
  app.post(
    '/api/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const registerBody = z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string(),
        alternativeEmail: z.string().optional(),
        password: z.string()
      })

      const { name, surname, email, alternativeEmail, password } =
        registerBody.parse(request.body)

      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return reply.code(400).send({ message: 'User already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          name,
          surname,
          email,
          alternativeEmail,
          password: hashedPassword
        }
      })

      const { accessToken, refreshToken } = generateTokens(newUser.id)

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
          message: 'Registration successful',
          accessToken,
          refreshToken
        }
      })
    }
  )
}
