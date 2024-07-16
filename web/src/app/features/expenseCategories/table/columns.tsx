import ExpenseCategory from '@/types/expense-category'
import { ColumnDef } from '@tanstack/react-table'
import { Actions } from './actions'

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-72 overflow-hidden">
        {row.original.description}
      </div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return <Actions />
    }
  }
]
