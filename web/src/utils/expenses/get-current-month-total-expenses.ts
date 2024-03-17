import Expense from '@/types/expense'

export const getCurrentMonthTotalExpenses = (
  expenses: Expense[] | undefined
): number => {
  if (!expenses) {
    return 0
  }

  const currentDate = new Date()
  const startOfMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    0,
    0,
    0
  )
  const endOfMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59
  )

  const currentMonthExpenses = expenses.filter((expense) => {
    // Convert expense date to local time zone and set time to 00:00:00
    const expenseDate = new Date(expense.date)
    expenseDate.setHours(0, 0, 0, 0)

    return expenseDate >= startOfMonthDate && expenseDate <= endOfMonthDate
  })

  const currentMonthExpensesTotal = currentMonthExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )

  return currentMonthExpensesTotal
}
