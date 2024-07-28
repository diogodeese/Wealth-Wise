import Expense from '@/types/recurring-expenses/recurring-expense'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '../../../shared/components/ui/column-header'
import { Actions } from './actions'

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'recurrenceDay',
    header: 'Recurrence Day',
    enableHiding: false,
    cell: ({ getValue }) => {
      const recurrenceDay = getValue<number>()

      return (
        <div className="pl-[15%]">
          {recurrenceDay < 10 ? `0${recurrenceDay}` : recurrenceDay}
        </div>
      )
    }
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    enableHiding: false
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Amount'} column={column} />
    },
    enableHiding: false,
    cell: ({ row }) => (
      <div className="p-4">{row.original.amount.toFixed(2)}€</div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Description',
    enableHiding: true,
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
      const recurringExpense = row.original

      return <Actions recurringExpense={recurringExpense} />
    }
  }
]
