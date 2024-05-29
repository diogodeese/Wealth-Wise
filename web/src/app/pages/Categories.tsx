import { useExpenseCategories } from '@/api/get-expense-categories'
import Layout from '@/app/components/layout'

export default function Categories() {
  const response = useExpenseCategories()
  const expenseCategories = response.data
  console.log(expenseCategories)
  return (
    <Layout>
      <h1>Categories</h1>
    </Layout>
  )
}
