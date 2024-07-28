import { deleteRecurringExpense } from '@/api/recurring-expenses/delete-recurring-expense'
import { Button } from '@/app/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { toast } from '@/app/shared/components/ui/use-toast'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { RecurringExpensesForm } from '../form/form'

interface ActionProps {
  recurringExpense: RecurringExpense
}

export function Actions({ recurringExpense }: ActionProps) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const { mutateAsync: deleteRecurringExpenseFn } = useMutation({
    mutationKey: ['delete-recurring-expense'],
    mutationFn: deleteRecurringExpense,
    onSuccess(deletedRecurringExpenseId: string) {
      queryClient.setQueryData<RecurringExpense[] | undefined>(
        ['recurring-expenses'],
        (data) => {
          if (!data) return []

          const newData = data.filter(
            (recurringExpense) =>
              recurringExpense.id !== deletedRecurringExpenseId
          )

          return newData
        }
      )

      toast({
        title: 'Recurring Expense Deleted',
        description: 'The recurring expense has been successfully deleted.'
      })
    },
    onError(error) {
      toast({
        variant: 'destructive',
        title: 'Error Deleting Recurring Expense',
        description: 'There was an error deleting the recurring expense.'
      })

      console.error('Error deleting recurring expense:', error)
    }
  })

  async function handleDeleteRecurringExpense(recurringExpenseId: string) {
    try {
      await deleteRecurringExpenseFn(recurringExpenseId)
    } catch (error) {
      console.error('Error deleting recurring expense:', error)
    }
  }

  return (
    <>
      {isEditing && (
        <RecurringExpensesForm
          mode="edit"
          recurringExpense={recurringExpense}
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-400"
            onClick={() => handleDeleteRecurringExpense(recurringExpense.id)}
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
