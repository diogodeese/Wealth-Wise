import Layout from '@/app/components/layout'
import ExpensesTable from '@/app/expenses/table'
import { isAuthenticated } from '@/utils/is-authenticated'
import { LastMonth } from '../expenses/last-month'
import { LastYear } from '../expenses/last-year'

export default function Expenses() {
  isAuthenticated()
  return (
    <Layout>
      <div className="flex flex-row gap-4">
        <LastMonth />
        <LastYear />
      </div>

      <ExpensesTable />
    </Layout>
  )
}
