import Layout from '@/app/components/layout'
import ExpensesTable from '@/app/expenses/table'
import { AveragePerMonth } from '../expenses/average-per-month'
import { CurrentMonth } from '../expenses/current-month'
import { LastMonth } from '../expenses/last-month'
import { LastYear } from '../expenses/last-year'

export default function Expenses() {
  return (
    <Layout>
      <div className="flex flex-row gap-4">
        <CurrentMonth />
        <LastMonth />
        <LastYear />
        <AveragePerMonth />
      </div>

      <ExpensesTable />
    </Layout>
  )
}
