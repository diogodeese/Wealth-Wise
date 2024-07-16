import { useExpenses } from '@/api/get-expenses'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpensesTable() {
  const { data } = useExpenses()

  const key = data ? JSON.stringify(data) : null

  const expenses = data?.map((expense) => ({
    ...expense,
    categoryName: expense.category.name
  }))

  return (
    <div className="py-8">
      <DataTable
        key={key}
        columns={columns}
        data={expenses || []}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
