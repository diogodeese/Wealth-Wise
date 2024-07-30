import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function logoutUser(app: FastifyInstance) {
  app.post(
    '/api/logout',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        reply
          .clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
          })
          .clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
          })
          .status(200)
          .send({ message: 'Logged out successfully' })
      } catch (error) {
        reply.code(500).send({ message: 'Logout failed' })
      }
    }
  )
}
