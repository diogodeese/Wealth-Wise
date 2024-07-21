import { deleteExpenseCategory } from '@/api/expense-categories/delete-expense-category'
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
import { handleError } from '@/utils/error-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { ExpenseCategoriesForm } from '../form/form'

interface ActionProps {
  expenseCategory: ExpenseCategory
}

export function Actions({ expenseCategory }: ActionProps) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

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
        description: 'The expense category has been successfully deleted.'
      })
    },
    onError(error: unknown) {
      const errorMessage = handleError(
        error,
        'There was an error deleting the expense category.'
      )

      toast({
        variant: 'destructive',
        title: 'Error Deleting Expense Category',
        description: errorMessage
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
    <>
      {isEditing && (
        <ExpenseCategoriesForm
          mode="edit"
          category={expenseCategory}
          onClose={() => setIsEditing(false)}
          isOpen={true}
        />
      )}
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
              setIsEditing(true)
            }}
          >
            <Pencil size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-400"
            onClick={() => {
              handleDeleteExpenseCategory(expenseCategory.id)
            }}
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
