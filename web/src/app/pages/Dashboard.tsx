import Layout from '@/app/shared/components/layout'
import { ExpensesChart } from '../features/dashboard/chart/expenses-chart'

export default function Dashboard() {
  return (
    <Layout>
      <ExpensesChart />
    </Layout>
  )
}
