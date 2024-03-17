import { useTotalExpensesWithAverageLastYear } from '@/api/get-average-monthly-expenses'
import Layout from '@/app/components/layout'
import ExpensesTable from '@/app/expenses/table'
import { CurrentMonth } from '../expenses/current-month'
import { LastMonth } from '../expenses/last-month'
import { LastYear } from '../expenses/last-year'

export default function Expenses() {
  const { data: totalExpensesData } = useTotalExpensesWithAverageLastYear()

  const { averageTotalAmount } = totalExpensesData || {}
  return (
    <Layout>
      {averageTotalAmount}
      <div className="flex flex-row gap-4">
        <CurrentMonth />
        <LastMonth />
        <LastYear />
      </div>

      <ExpensesTable />
    </Layout>
  )
}
