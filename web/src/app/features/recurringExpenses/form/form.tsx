import { useExpenseCategories } from '@/api/expense-categories/get-expense-categories'
import { createRecurringExpense } from '@/api/recurring-expenses/create-recurring-expenses'
import { updateRecurringExpense } from '@/api/recurring-expenses/update-recurring-expense'
import { Button } from '@/app/shared/components/ui/button'
import { Combobox } from '@/app/shared/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/shared/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/shared/components/ui/form'
import { Input } from '@/app/shared/components/ui/input'
import { Textarea } from '@/app/shared/components/ui/textarea'
import RecurringExpense from '@/types/recurring-expenses/recurring-expense'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const recurringExpensesFormSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be a positive number')
    .refine((val) => !isNaN(val), {
      message: 'Amount must be a valid number',
      path: ['amount']
    }),
  categoryId: z.string(),
  recurrenceDay: z
    .number()
    .min(1, 'Day must be between 1 and 31')
    .max(31, 'Day must be between 1 and 31'),
  description: z
    .string()
    .max(256, {
      message: 'Descriptions must be smaller than 256 characters'
    })
    .optional()
})

interface RecurringExpensesFormProps {
  mode: 'create' | 'edit'
  recurringExpense?: RecurringExpense
  onClose: () => void
  isOpen: boolean
}

export function RecurringExpensesForm({
  mode,
  recurringExpense,
  onClose,
  isOpen
}: RecurringExpensesFormProps) {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof recurringExpensesFormSchema>>({
    resolver: zodResolver(recurringExpensesFormSchema),
    defaultValues: {
      amount: recurringExpense?.amount ?? 0.0,
      categoryId: recurringExpense?.categoryId ?? '',
      recurrenceDay: recurringExpense?.recurrenceDay ?? 1,
      description: recurringExpense?.description ?? ''
    }
  })

  const { reset } = form

  const mutationFn = async (data: {
    id?: string
    amount: number
    categoryId: string
    recurrenceDay: number
    description?: string
  }) => {
    if (mode === 'create') {
      return createRecurringExpense(data)
    } else {
      if (!data.id) throw new Error('ID is required for updating')
      return updateRecurringExpense(data.id, data)
    }
  }

  const mutationKey =
    mode === 'create'
      ? ['create-recurring-expense']
      : ['update-recurring-expense']

  const { mutateAsync: handleRecurringExpenseFn } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(response: RecurringExpense) {
      const updatedExpense: RecurringExpense = response
      queryClient.setQueryData<RecurringExpense[] | undefined>(
        ['recurring-expenses'],
        (data) => {
          if (mode === 'create') {
            return data ? [...data, updatedExpense] : [updatedExpense]
          } else {
            return data
              ? data.map((exp) =>
                  exp.id === updatedExpense.id ? updatedExpense : exp
                )
              : [updatedExpense]
          }
        }
      )
      onClose()
      reset()
    }
  })

  async function onSubmit(values: z.infer<typeof recurringExpensesFormSchema>) {
    try {
      if (mode === 'create') {
        await handleRecurringExpenseFn(values)
      } else if (recurringExpense) {
        await handleRecurringExpenseFn({ ...values, id: recurringExpense.id })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { data: categories } = useExpenseCategories()

  let comboboxCategories: { id: string; text: string }[] = []

  if (categories && Array.isArray(categories)) {
    comboboxCategories = categories.map((category) => ({
      id: category.id,
      text: category.name
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Add Recurring Expense'
              : 'Edit Recurring Expense'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Fill out the form below to add a recurring expense.'
              : 'Modify the details of the selected recurring expense.'}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="100.00"
                          className="block rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          {...field}
                          value={field.value || ''}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                        />
                        <span className="ml-2 text-gray-500">€</span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the amount of the expense.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recurrenceDay"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Recurrence Day</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="15"
                        className="block rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        {...field}
                        value={field.value || ''}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Select the day of the month for the expense to recur.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Category</FormLabel>
                    <Combobox
                      label="Select Category"
                      data={comboboxCategories}
                      defaultValue={field.value}
                      onSelect={(categoryId: string) => {
                        form.setValue('categoryId', categoryId)
                      }}
                    />
                    <FormDescription>
                      Choose the category of the expense.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter expense description"
                      className="block max-h-40 w-full rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a description for the expense.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {mode === 'create' ? 'Submit' : 'Save Changes'}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
