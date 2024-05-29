import ExpenseCategory from '@/types/expense-category'
import { ColumnDef } from '@tanstack/react-table'
// import { Actions } from './actions'

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: 'categoryName',
    header: 'Category',
    enableHiding: false
  }
  // {
  //   accessorKey: 'description',
  //   header: 'Description',
  //   enableHiding: true,
  //   cell: ({ row }) => (
  //     <div className="line-clamp-2 max-w-72 overflow-hidden">
  //       {row.original.description}
  //     </div>
  //   )
  // }
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const expense = row.original

  //     return <Actions expenseId={expense.id} />
  //   }
  // }
]
