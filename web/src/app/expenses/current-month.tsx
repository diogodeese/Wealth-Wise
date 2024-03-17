import { useExpenses } from '@/api/get-expenses'
import { calculatePercentageDifference } from '@/utils/expenses/calculate-percentage-difference'
import { getCurrentMonthTotalExpenses } from '@/utils/expenses/get-current-month-total-expenses'
import { getLastMonthExpensesTotal } from '@/utils/expenses/get-last-month-total-expenses'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function CurrentMonth() {
  const { data } = useExpenses()

  const lastMonthExpensesTotal = getLastMonthExpensesTotal(data)
  const currentMonthExpensesTotal = getCurrentMonthTotalExpenses(data)

  const formattedTotal = currentMonthExpensesTotal.toFixed(2)
  const [integerPart, decimalPart] = formattedTotal.split('.')
  const paddedDecimalPart = decimalPart.padEnd(2, '0')

  const percentageDifference = calculatePercentageDifference(
    currentMonthExpensesTotal,
    lastMonthExpensesTotal
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Month</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-400">
          {integerPart}.<span className="text-xl">{paddedDecimalPart}€</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {percentageDifference.toFixed(2)}% from last month
        </p>
      </CardContent>
    </Card>
  )
}
