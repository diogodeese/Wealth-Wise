import { useExpenses } from '@/api/get-expenses'
import { useSearchParams } from 'react-router-dom'
import { DataTable } from '../../../shared/components/ui/data-table'
import { columns } from './columns'
import Toolbar from './toolbar'

export default function ExpensesTable() {
  const [searchParams] = useSearchParams()

  const from = searchParams.get('from') || undefined
  const to = searchParams.get('to') || undefined
  const categories = searchParams.get('categories')?.split(',')

  const { data } = useExpenses(from, to, categories)

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
