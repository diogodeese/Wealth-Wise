import { useExpenses } from '@/api/get-expenses'
import Expense from '@/types/expense'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function LastMonth() {
  const { data } = useExpenses()

  const getLastMonthExpenses = (expenses: Expense[] | undefined): Expense[] => {
    if (!expenses) {
      return []
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

    return lastMonthExpenses
  }

  const lastMonthExpenses = getLastMonthExpenses(data)
  const lastMonthExpensesTotal = lastMonthExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )

  const formattedTotal = lastMonthExpensesTotal.toFixed(2)
  const [integerPart, decimalPart] = formattedTotal.split('.')
  const paddedDecimalPart = decimalPart.padEnd(2, '0')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Last Month</CardTitle>
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
          {integerPart}.<span className="text-xl">{paddedDecimalPart}€</span>
        </div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  )
}
