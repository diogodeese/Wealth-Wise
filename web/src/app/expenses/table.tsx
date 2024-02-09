import { useExpenses } from '@/api/get-expenses'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function ExpensesTable() {
  const { data } = useExpenses()

  const expenses = data?.map((expense) => ({
    ...expense,
    categoryName: expense.category.name
  }))

  return (
    <div className="py-8">
      <DataTable columns={columns} data={expenses || []} />
    </div>
  )
}
