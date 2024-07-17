import ExpenseCategory from '@/types/expense-category'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'
import { Actions } from './actions'

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'essential',
    header: 'Essential',
    cell: ({ row }) => (
      <div className="flex max-w-16 items-center justify-center">
        {row.original.essential ? (
          <Check className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
      </div>
    )
  },
  {
    accessorKey: 'recurring',
    header: 'Recurring',
    cell: ({ row }) => (
      <div className="flex max-w-16 items-center justify-center">
        {row.original.recurring ? (
          <Check className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
      </div>
    )
  },
  {
    accessorKey: 'budgetCap',
    header: 'Budget Cap'
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
