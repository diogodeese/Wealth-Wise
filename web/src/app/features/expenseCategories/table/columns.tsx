import ExpenseCategory from '@/types/expense-categories/expense-category'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'
import { DataTableColumnHeader } from '../../../shared/components/ui/column-header'
import { Actions } from './actions'

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'essential',
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Essential'} column={column} />
    },
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
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Recurring'} column={column} />
    },
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
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Budget Cap'} column={column} />
    },
    cell: ({ row }) => (
      <div className="p-4">
        {row.original.budgetCap
          ? Number(row.original.budgetCap).toFixed(2) + '€'
          : 'N/A'}
      </div>
    )
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
    cell: ({ row }) => {
      const expenseCategory = row.original

      return <Actions expenseCategory={expenseCategory} />
    }
  }
]
