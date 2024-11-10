import { useRecurringExpenses } from '@/api/recurring-expenses/get-recurring-expenses'
import { Loading } from '@/app/shared/components/loading'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function RecurringExpensesTable() {
  const { data, isLoading, isError } = useRecurringExpenses()

  if (isLoading) return <Loading />
  if (isError) return <div>Error loading data or no data available.</div>

  const key = data ? JSON.stringify(data) : null

  const recurringExpenses = data
    ? data.map((recurringExpense: RecurringExpense) => ({
        ...recurringExpense,
        categoryName: recurringExpense.category.name
      }))
    : []

  return (
    <div className="h-full">
      <DataTable
        key={key}
        columns={columns}
        data={recurringExpenses}
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
