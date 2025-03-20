import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { AuthenticatedRequest } from '../../../interfaces/request'
import { prisma } from '../../../lib/prisma'
import { validateToken } from '../../middleware/validate-token'

/**
 * @swagger
 * /api/recurring-expenses:
 *   post:
 *     summary: Create a recurring expense
 *     description: Creates a new recurring expense for the authenticated user.
 *     tags:
 *       - Recurring Expenses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.75
 *               description:
 *                 type: string
 *                 example: "Monthly subscription"
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 example: "category123"
 *               recurrenceDay:
 *                 type: integer
 *                 example: 15
 *                 description: "Day of the month when the recurring expense is applied"
 *     responses:
 *       201:
 *         description: Recurring expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "recurringExpense456"
 *                 userId:
 *                   type: string
 *                   example: "user123"
 *                 categoryId:
 *                   type: string
 *                   example: "category123"
 *                 amount:
 *                   type: number
 *                   example: 50.75
 *                 description:
 *                   type: string
 *                   example: "Monthly subscription"
 *                 recurrenceDay:
 *                   type: integer
 *                   example: 15
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-22T10:45:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-22T10:45:00Z"
 *       400:
 *         description: Bad request or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request body"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Invalid categoryId format"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not authenticated"
 *       404:
 *         description: User or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
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
export async function createRecurringExpense(app: FastifyInstance) {
  app.post(
    '/api/recurring-expenses',
    { preHandler: [validateToken] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticatedRequest = request as AuthenticatedRequest

      const createRecurringExpenseBody = z.object({
        amount: z.number().positive(),
        description: z.string().min(1, 'Description cannot be empty'),
        categoryId: z.string().uuid(),
        recurrenceDay: z.number().int().min(1).max(31)
      })

      try {
        // Validate request body
        const { amount, description, categoryId, recurrenceDay } =
          createRecurringExpenseBody.parse(request.body)

        // Check if user is authenticated
        if (!authenticatedRequest.userId) {
          return reply.status(401).send({ error: 'User not authenticated' })
        }

        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { id: authenticatedRequest.userId }
        })

        if (!user) {
          return reply.status(404).send({ error: 'User not found' })
        }

        // Check if the category exists in the database
        const category = await prisma.expenseCategory.findUnique({
          where: { id: categoryId }
        })
        if (!category) {
          return reply.status(400).send({ error: 'Invalid category ID' })
        }

        // Create the recurring expense
        const recurringExpense = await prisma.recurringExpense.create({
          data: {
            userId: authenticatedRequest.userId,
            amount,
            description,
            categoryId,
            recurrenceDay
          }
        })

        return reply.status(201).send(recurringExpense)
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle body validation errors
          const validationErrors = error.errors.map((err) => err.message)
          return reply
            .status(400)
            .send({ error: 'Invalid request body', details: validationErrors })
        }

        console.error('Error creating recurring expense:', error)

        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}
