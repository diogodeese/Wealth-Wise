import { useTotalExpensesForYear } from '@/api/get-total-expenses-for-year'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/shared/components/ui/card'
import { calculatePercentageDifference } from '@/utils/calculate-percentage-difference'

export function LastYear() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const lastYear = currentYear - 1
  const comparisonYear = lastYear - 1

  const { data: totalExpensesForYear } = useTotalExpensesForYear(lastYear)

  const formattedTotal = (totalExpensesForYear ?? 0).toFixed(2)
  const [integerPart, decimalPart] = formattedTotal.split('.')
  const paddedDecimalPart = decimalPart ? decimalPart.padEnd(2, '0') : ''

  // Calculate percentage difference based on the comparison year
  const comparisonYearTotalExpenses =
    useTotalExpensesForYear(comparisonYear).data ?? 0
  const percentageDifference = calculatePercentageDifference(
    totalExpensesForYear ?? 0,
    comparisonYearTotalExpenses
  )

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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-400">
          {integerPart}
          {decimalPart && (
            <span className="text-lg">.{paddedDecimalPart}€</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {Number.isFinite(percentageDifference)
            ? `${percentageDifference >= 0 ? '+' : ''}${percentageDifference.toFixed(1)}% from ${comparisonYear}`
            : `No expenses in ${comparisonYear} for comparison`}
        </p>
      </CardContent>
    </Card>
  )
}
