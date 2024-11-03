import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     description: Clears the access and refresh tokens cookies and logs the user out.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       500:
 *         description: Logout failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout failed"
 */
export async function logoutUser(app: FastifyInstance) {
  app.post(
    '/api/logout',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Clear cookies
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

        const cookiesCleared =
          !request.cookies['accessToken'] && !request.cookies['refreshToken']
        if (!cookiesCleared) {
          console.warn('Cookies were not set for access or refresh tokens.')
        }

        reply.status(200).send({ message: 'Logged out successfully' })
      } catch (error) {
        console.error('Error during logout:', error)
        reply.code(500).send({ error: 'Logout failed' })
      }
    }
  )
}
