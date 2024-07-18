import { deleteExpenseCategory } from '@/api/delete-expense-category'
import { Button } from '@/app/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { toast } from '@/app/shared/components/ui/use-toast'
import ExpenseCategory from '@/types/expense-category'
import { ToastAction } from '@radix-ui/react-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

interface ActionProps {
  expenseCategoryId: string
}

export function Actions({ expenseCategoryId }: ActionProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteExpenseCategoryFn } = useMutation({
    mutationKey: ['delete-expense-category'],
    mutationFn: deleteExpenseCategory,
    onSuccess(deletedExpenseCategoryId: string) {
      queryClient.setQueryData<ExpenseCategory[] | undefined>(
        ['expense-categories'],
        (data) => {
          if (!data) return []

          const newData = data.filter(
            (expenseCategory) => expenseCategory.id !== deletedExpenseCategoryId
          )

          return newData
        }
      )

      toast({
        title: 'Expense Category Deleted',
        description: 'The expense category has been successfully deleted.',
        action: <ToastAction altText="Undo">Undo</ToastAction>
      })
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error Deleting Expense Category',
        description: 'There was an error deleting the expense category.',
        action: <ToastAction altText="Try Again">Try Again</ToastAction>
      })

      console.error('Error deleting expense category:', error)
    }
  })

  async function handleDeleteExpenseCategory(expenseCategoryId: string) {
    try {
      return await deleteExpenseCategoryFn(expenseCategoryId)
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
          onClick={() => {
            console.log('edit')
          }}
        >
          <Pencil size={16} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400"
          onClick={() => {
            handleDeleteExpenseCategory(expenseCategoryId)
          }}
        >
          <Trash size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
