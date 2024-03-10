import Expense from '@/types/expense'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Actions } from './actions'
import { DataTableColumnHeader } from './column-header'

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Date'} column={column} />
    },
    sortDescFirst: true,
    enableHiding: false,
    cell: ({ row }) => {
      const { date } = row.original
      const formattedDate = date ? format(new Date(date), 'dd/MM/yyyy') : ''

      return <div>{formattedDate}</div>
    }
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    enableHiding: false
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
    accessorKey: 'amount',
    header: ({ column }) => {
      return <DataTableColumnHeader title={'Amount'} column={column} />
    },
    enableHiding: false,
    cell: ({ row }) => (
      <div className="p-4">{row.original.amount.toFixed(2)}€</div>
    )
  },
  // {
  //   accessorKey: 'paymentMethod',
  //   header: 'Payment Method',
  //   enableHiding: true
  // },
  {
    accessorKey: 'receipt',
    header: 'Receipt',
    enableHiding: true
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const expense = row.original

      return <Actions expenseId={expense.id} />
    }
  }
]
