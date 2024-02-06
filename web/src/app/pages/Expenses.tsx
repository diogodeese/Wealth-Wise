import Layout from '@/app/components/layout'
import ExpensesTable from '@/app/expenses/table'
import { ExpensesForm } from '../components/expenses-form'

export default function Expenses() {
  return (
    <Layout>
      <ExpensesForm />
      <ExpensesTable />
    </Layout>
  )
}
