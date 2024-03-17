import Expense from '@/types/expense'

export const getLastYearExpensesTotal = (
  expenses: Expense[] | undefined
): number => {
  if (!expenses) {
    return 0
  }

  const currentDate = new Date()
  const startOfLastYearDate = new Date(currentDate.getFullYear() - 1, 0, 1)
  const endOfLastYearDate = new Date(currentDate.getFullYear() - 1, 11, 31)

  const lastYearExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    expenseDate.setHours(0, 0, 0, 0)

    return (
      expenseDate >= startOfLastYearDate && expenseDate <= endOfLastYearDate
    )
  })

  const lastYearExpensesTotal = lastYearExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )

  return lastYearExpensesTotal
}
