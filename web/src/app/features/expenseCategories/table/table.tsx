import { useExpenseCategories } from '@/api/expense-categories/get-expense-categories'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpenseCategoriesTable() {
  const { data } = useExpenseCategories()

  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
