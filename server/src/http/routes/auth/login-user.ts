import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { prisma } from '../../../lib/prisma'
dotenv.config()

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return access and refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *         setCookie:
 *           - name: accessToken
 *             description: JWT access token
 *           - name: refreshToken
 *             description: JWT refresh token
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
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
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export async function loginUser(app: FastifyInstance) {
  app.post(
    '/api/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
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
          maxAge: 3600 * 1000, // 1 hour
          path: '/'
        })
        reply.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 30 * 24 * 3600 * 1000, // 30 days
          path: '/'
        })

        reply.status(200).send({
          message: 'Logged in successfully'
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Handle Zod validation errors
          return reply
            .status(400)
            .send({ error: 'Validation failed', details: error.errors })
        }

        console.error('Error during login: ', error)
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
