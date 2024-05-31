import { createExpense } from '@/api/create-expense'
import { useExpenseCategories } from '@/api/get-expense-categories'
import { Button } from '@/app/shared/components/ui/button'
import { Calendar } from '@/app/shared/components/ui/calendar'
import { Combobox } from '@/app/shared/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/shared/components/ui/form'
import { Input } from '@/app/shared/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/shared/components/ui/popover'
import { Textarea } from '@/app/shared/components/ui/textarea'
import { cn } from '@/lib/utils'
import Expense from '@/types/expense'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const expensesFormSchema = z.object({
  amount: z
    .string()
    .transform((val) => parseFloat(val)) // Transform string to number
    .refine((val) => !isNaN(val), {
      message: 'Amount must be a valid number',
      path: ['amount']
    }),
  categoryId: z.string(),
  date: z
    .date()
    .refine(
      (date) => {
        return date !== null
      },
      {
        message: 'Please select a date',
        path: ['date']
      }
    )
    .refine(
      (date) => {
        return !isNaN(date.getTime())
      },
      {
        message: "That's not a valid date",
        path: ['date']
      }
    ),
  description: z
    .string()
    .max(256, {
      message: 'Descriptions must be smaller than 256 characters'
    })
    .optional()
})

export function ExpensesForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      amount: undefined,
      categoryId: undefined,
      date: new Date(),
      description: undefined
    }
  })

  const { mutateAsync: createExpenseFn } = useMutation({
    mutationKey: ['create-expense'],
    mutationFn: createExpense,
    onSuccess(response: Expense) {
      const expense: Expense = response

      queryClient.setQueryData<Expense[] | undefined>(['expenses'], (data) => {
        const newData = data ? [...data] : []

        newData.push({
          id: expense.id,
          userId: expense.userId,
          amount: expense.amount,
          date: expense.date,
          categoryId: expense.categoryId,
          category: categories?.find(
            (category) => category.id === expense.categoryId
          ) || { id: '', name: '', description: '' },
          description: expense.description,
          currency: expense.currency,
          location: expense.location,
          receipt: expense.receipt,
          createdAt: expense.createdAt,
          updatedAt: expense.updatedAt
        })

        newData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        return newData
      })
    }
  })

  async function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    try {
      await createExpenseFn(values)
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8">
          <Plus width={12} height={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Fill out the form below to add an expense to your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
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
                          placeholder="100,00"
                          className="block rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          {...field}
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
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date >= new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the date of the expense.
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
                render={() => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Category</FormLabel>
                    <Combobox
                      label="Select Category"
                      data={comboboxCategories || []}
                      onSelect={(categoryId: string) => {
                        const selectedCategory = categories?.find(
                          (category) => category?.id === categoryId
                        )

                        if (selectedCategory) {
                          form.setValue('categoryId', selectedCategory.id)
                        }
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
