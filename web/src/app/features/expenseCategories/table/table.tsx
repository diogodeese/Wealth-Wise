import { useExpenseCategories } from '@/api/get-expense-categories'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpenseCategoriesTable() {
  const { data } = useExpenseCategories()

  const key = data ? JSON.stringify(data) : null

  return (
    <div className="py-8">
      <DataTable
        key={key}
        columns={columns}
        data={data || []}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
