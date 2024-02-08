import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'
import { generateToken } from '../../utils/generate-token'

export async function loginUser(app: FastifyInstance) {
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
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

    const token = generateToken(user.id)
    reply.send({ token })
  })
}
