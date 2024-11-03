import { useExpenses } from '@/api/expenses/get-expenses'
import { Expense } from '@/types/expenses/expense'
import { useSearchParams } from 'react-router-dom'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpensesTable() {
  const [searchParams] = useSearchParams()

  const from = searchParams.get('from') || undefined
  const to = searchParams.get('to') || undefined
  const categories = searchParams.get('categories')?.split(',')

  const { data, isLoading, isError } = useExpenses(from, to, categories)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data or no data available.</div>

  const expenses = data
    ? data.map((expense: Expense) => ({
        ...expense,
        categoryName: expense.category.name
      }))
    : []

  return (
    <div className="mt-8 h-full">
      <DataTable
        columns={columns}
        data={expenses} // Pass the mapped expenses
        ToolbarComponent={Toolbar}
      />
    </div>
  )
}
