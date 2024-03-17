import { useExpenses } from '@/api/get-expenses'
import { getLastMonthExpensesTotal } from '@/utils/expenses/get-last-month-total-expenses'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function LastMonth() {
  const { data } = useExpenses()

  const lastMonthExpensesTotal = getLastMonthExpensesTotal(data)
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
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
