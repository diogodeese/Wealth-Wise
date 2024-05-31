import { useExpenses } from '@/api/get-expenses'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function ExpensesTable() {
  const { data } = useExpenses()

  const key = data ? JSON.stringify(data) : null

  const expenses = data?.map((expense) => ({
    ...expense,
    categoryName: expense.category.name
  }))

  return (
    <div className="py-8">
      <DataTable key={key} columns={columns} data={expenses || []} />
    </div>
  )
}
