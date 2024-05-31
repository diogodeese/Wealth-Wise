import ExpensesTable from '../features/expenses/table/table'
import Layout from '../shared/components/layout'

import { AveragePerMonth } from '../features/expenses/components/average-per-month'
import { CurrentMonth } from '../features/expenses/components/current-month'
import { LastMonth } from '../features/expenses/components/last-month'
import { LastYear } from '../features/expenses/components/last-year'

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
