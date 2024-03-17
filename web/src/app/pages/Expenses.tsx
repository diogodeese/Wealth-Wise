import Layout from '@/app/components/layout'
import ExpensesTable from '@/app/expenses/table'
import { isAuthenticated } from '@/utils/is-authenticated'
import { CurrentMonth } from '../expenses/current-month'
import { LastMonth } from '../expenses/last-month'
import { LastYear } from '../expenses/last-year'

export default function Expenses() {
  isAuthenticated()
  return (
    <Layout>
      <div className="flex flex-row gap-4">
        <CurrentMonth />
        <LastMonth />
        <LastYear />
      </div>

      <ExpensesTable />
    </Layout>
  )
}
