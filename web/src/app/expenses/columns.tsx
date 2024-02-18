import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu'
import Expense from '@/types/expense'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
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
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
