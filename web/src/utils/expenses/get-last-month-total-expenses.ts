import Expense from '@/types/expense'

export const getLastMonthExpensesTotal = (
  expenses: Expense[] | undefined
): number => {
  if (!expenses) {
    return 0
  }

  const currentDate = new Date()
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
    0,
    0,
    0
  )
  const endOfLastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
    23,
    59,
    59
  )

  const lastMonthExpenses = expenses.filter((expense) => {
    // Convert expense date to local time zone and set time to 00:00:00
    const expenseDate = new Date(expense.date)
    expenseDate.setHours(0, 0, 0, 0)

    return expenseDate >= lastMonthDate && expenseDate <= endOfLastMonthDate
  })

  const lastMonthExpensesTotal = lastMonthExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )

  return lastMonthExpensesTotal
}
