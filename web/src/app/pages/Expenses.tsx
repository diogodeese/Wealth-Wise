import { getExpenseCategories } from '@/api/get-expense-categories'
import Layout from '@/app/components/layout'
import { Combobox } from '@/app/components/ui/combobox'
import ExpensesTable from '@/app/expenses/page'
import { useQuery } from '@tanstack/react-query'

export default function Expenses() {
  const { data } = useQuery({
    queryKey: ['expense-categories'],
    queryFn: getExpenseCategories
  })

  const comboboxData = data?.map((expenseCategory) => ({
    id: expenseCategory.id,
    text: expenseCategory.name
  }))

  return (
    <Layout>
      <Combobox label="Select Category" data={comboboxData || []} />
      <ExpensesTable />
    </Layout>
  )
}
