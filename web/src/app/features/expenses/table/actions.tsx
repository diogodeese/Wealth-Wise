import { deleteExpense } from '@/api/delete-expense'
import { Button } from '@/app/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { ToastAction } from '@/app/shared/components/ui/toast'
import { toast } from '@/app/shared/components/ui/use-toast'
import Expense from '@/types/expense'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Clipboard, MoreHorizontal, Trash } from 'lucide-react'

interface ActionProps {
  expenseId: string
}

export function Actions({ expenseId }: ActionProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteExpenseFn } = useMutation({
    mutationKey: ['delete-expense'],
    mutationFn: deleteExpense,
    onSuccess(deletedExpenseId: string) {
      queryClient.setQueryData<Expense[] | undefined>(['expenses'], (data) => {
        if (!data) return []

        const newData = data.filter(
          (expense) => expense.id !== deletedExpenseId
        )

        return newData
      })

      toast({
        title: 'Expense Deleted',
        description: 'The expense has been successfully deleted.',
        action: <ToastAction altText="Undo">Undo</ToastAction>
      })
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error Deleting Expense',
        description: 'There was an error deleting the expense.',
        action: <ToastAction altText="Try Again">Try Again</ToastAction>
      })

      console.error('Error deleting expense:', error)
    }
  })

  async function handleDeleteExpense(expenseId: string) {
    try {
      return await deleteExpenseFn(expenseId)
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

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
          onClick={() => navigator.clipboard.writeText(expenseId)}
        >
          <Clipboard size={16} />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-400"
          onClick={() => {
            handleDeleteExpense(expenseId)
          }}
        >
          <Trash size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
