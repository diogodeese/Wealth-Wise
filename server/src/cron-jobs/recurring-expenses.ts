import cron from 'node-cron'
import { prisma } from '../lib/prisma'

export const cronJobRecurringExpenses = cron.schedule('0 0 * * *', async () => {
  // Runs daily at midnight
  const today = new Date()
  const day = today.getDate()

  try {
    // Find recurring expenses that should be created today
    const recurringExpenses = await prisma.recurringExpense.findMany({
      where: {
        recurrenceDay: day
      }
    })

    // Create expenses based on recurring expense configurations
    for (const recurringExpense of recurringExpenses) {
      await prisma.expense.create({
        data: {
          userId: recurringExpense.userId,
          amount: recurringExpense.amount,
          description: recurringExpense.description,
          categoryId: recurringExpense.categoryId,
          date: today
        }
      })
    }

    console.log('Recurring expenses created successfully.')
  } catch (error) {
    console.error('Error creating recurring expenses:', error)
  }
})
