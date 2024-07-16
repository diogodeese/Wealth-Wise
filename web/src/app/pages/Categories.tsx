import Layout from '@/app/shared/components/layout'
import ExpenseCategoriesTable from '../features/expenseCategories/table/table'

export default function Categories() {
  return (
    <Layout>
      <h1>Categories</h1>

      <ExpenseCategoriesTable />
    </Layout>
  )
}
