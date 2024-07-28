import { useRecurringExpenses } from '@/api/recurring-expenses/get-recurring-expenses'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function RecurringExpensesTable() {
  const { data } = useRecurringExpenses()

  const key = data ? JSON.stringify(data) : null

  const recurringExpenses = data?.map((recurringExpense) => ({
    ...recurringExpense,
    categoryName: recurringExpense.category.name
  }))

  return (
    <div className="h-full ">
      <DataTable
        key={key}
        columns={columns}
        data={recurringExpenses || []}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
