import { useExpenses } from '@/api/get-expenses'
import Expense from '@/types/expense'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function LastYear() {
  const { data } = useExpenses()

  const getLastYearExpenses = (expenses: Expense[] | undefined): Expense[] => {
    if (!expenses) {
      return []
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

    return lastYearExpenses
  }

  const lastYearExpenses = getLastYearExpenses(data)
  console.log(lastYearExpenses)

  const lastYearExpensesValue = lastYearExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )
  const [integerPart, decimalPart] = lastYearExpensesValue.toFixed(2).split('.')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Last Year</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-400">
          {integerPart}
          {decimalPart && <span className="text-lg">.{decimalPart}€</span>}
        </div>
        {decimalPart && (
          <p className="text-xs text-muted-foreground">+45.3% from last year</p>
        )}
      </CardContent>
    </Card>
  )
}
