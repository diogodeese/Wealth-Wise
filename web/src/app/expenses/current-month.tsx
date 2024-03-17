import { useTotalExpensesForMonth } from '@/api/get-total-expenses-for-month'
import { calculatePercentageDifference } from '@/utils/calculate-percentage-difference'
import { format, subMonths } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function CurrentMonth() {
  const currentDate = new Date()

  const currentMonth = parseInt(format(currentDate, 'MM'))
  const currentYear = parseInt(format(currentDate, 'yyyy'))

  const { data: currentMonthExpensesTotal } = useTotalExpensesForMonth(
    currentMonth,
    currentYear
  )

  const lastMonthDate = subMonths(currentDate, 1)
  const lastMonth = parseInt(format(lastMonthDate, 'MM'))
  const lastMonthYear = parseInt(format(lastMonthDate, 'yyyy'))

  const { data: lastMonthExpensesTotal } = useTotalExpensesForMonth(
    lastMonth,
    lastMonthYear
  )

  const formattedTotal = (currentMonthExpensesTotal ?? 0).toFixed(2)
  const [integerPart, decimalPart] = formattedTotal.split('.')
  const paddedDecimalPart = decimalPart.padEnd(2, '0')

  const percentageDifference = calculatePercentageDifference(
    currentMonthExpensesTotal ?? 0,
    lastMonthExpensesTotal ?? 0
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
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
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
          {percentageDifference >= 0 ? '+' : ''}
          {percentageDifference.toFixed(2)}% from last month
        </p>
      </CardContent>
    </Card>
  )
}
