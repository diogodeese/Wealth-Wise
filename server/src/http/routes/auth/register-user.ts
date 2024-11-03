import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
import { generateTokens } from '../../../utils/generate-tokens'

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account and return access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               alternativeEmail:
 *                 type: string
 *                 example: john.alternate@example.com
 *                 description: Optional alternative email
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Registration successful"
 *                     accessToken:
 *                       type: string
 *                       description: "JWT access token"
 *                     refreshToken:
 *                       type: string
 *                       description: "JWT refresh token"
 *       400:
 *         description: User already exists or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User already exists"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Invalid email format"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
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
export async function registerUser(app: FastifyInstance) {
  app.post(
    '/api/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const registerBody = z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string().email(), // Ensure valid email format
        alternativeEmail: z.string().email().optional(), // Ensure valid email format for optional field
        password: z.string().min(6) // Minimum password length for security
      })

      try {
        const { name, surname, email, alternativeEmail, password } =
          registerBody.parse(request.body)

        const existingUser = await prisma.user.findUnique({
          where: { email }
        })

        if (existingUser) {
          return reply.status(400).send({ error: 'User already exists' })
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

        return reply.status(200).send({
          data: {
            message: 'Registration successful',
            accessToken,
            refreshToken
          }
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors
          })
        }
        console.error('Registration error:', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
