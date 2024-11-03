import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../middleware/verify-token'

interface WhereCondition {
  userId: string | undefined
  categoryId?: {
    in: string[]
  }
  date?: {
    gte?: Date // Greater than or equal to
    lte?: Date // Less than or equal to
  }
}

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get user expenses
 *     description: Retrieve a list of expenses for the authenticated user. You can filter by category and date range.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categories
 *         in: query
 *         description: Comma-separated list of category IDs to filter expenses by
 *         required: false
 *         schema:
 *           type: string
 *           example: "category123,category456"
 *       - name: from
 *         in: query
 *         description: Start date of the range filter (YYYY-MM-DD)
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-10-01"
 *       - name: to
 *         in: query
 *         description: End date of the range filter (YYYY-MM-DD)
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-10-31"
 *     responses:
 *       200:
 *         description: List of user expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "expense123"
 *                       amount:
 *                         type: number
 *                         example: 100.5
 *                       description:
 *                         type: string
 *                         example: "Groceries"
 *                       category:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Groceries"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-10-15"
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
 *                         example: "Invalid date format"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "from"
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
export async function getExpenses(app: FastifyInstance) {
  app.get(
    '/api/expenses',
    { preHandler: [verifyToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const querySchema = z.object({
          categories: z.string().optional(),
          from: z.string().optional(),
          to: z.string().optional()
        })
        const { categories, from, to } = querySchema.parse(request.query)

        const authenticatedRequest = request as AuthenticatedRequest
        let whereCondition: WhereCondition = {
          userId: authenticatedRequest.userId
        }

        // Add categories to the condition if provided
        if (categories) {
          whereCondition.categoryId = {
            in: categories.split(',')
          }
        }

        // Add date range to the condition if provided
        if (from && to) {
          whereCondition.date = {
            gte: new Date(from),
            lte: new Date(to)
          }
        }

        // Fetch expenses based on the conditions
        const expenses = await prisma.expense.findMany({
          where: whereCondition,
          include: {
            category: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            date: 'desc'
          }
        })

        return reply.status(200).send({ data: expenses })
      } catch (error) {
        console.error('Error fetching expenses:', error)
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation failed',
            details: error.errors.map((e) => ({
              message: e.message,
              path: e.path
            }))
          })
        }
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
