import { useExpenseCategories } from '@/api/get-expense-categories'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpenseCategoriesTable() {
  const { data } = useExpenseCategories()

  return (
    <div className="py-8">
      <DataTable
        columns={columns}
        data={data || []}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
