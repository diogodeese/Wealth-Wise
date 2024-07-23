import { useExpenseCategories } from '@/api/expense-categories/get-expense-categories'
import { createExpense } from '@/api/expenses/create-expense'
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
import { toast } from '@/app/shared/components/ui/use-toast'
import { cn } from '@/lib/utils'
import Expense from '@/types/expense'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const expensesFormSchema = z.object({
  amount: z
    .string()
    .transform((val) => parseFloat(val))
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
  const [searchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const fromFilter = searchParams.get('from') || undefined
  const toFilter = searchParams.get('to') || undefined
  const categoriesFilter = searchParams.get('categories')?.split(',')

  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      amount: 0.0,
      categoryId: '',
      date: new Date(),
      description: ''
    }
  })

  const { mutateAsync: createExpenseFn } = useMutation({
    mutationKey: ['create-expense'],
    mutationFn: createExpense,
    onSuccess(response: Expense & { warning?: string }) {
      const expense: Expense = response
      const warning = response.warning

      queryClient.setQueryData<Expense[] | undefined>(
        ['expenses', fromFilter, toFilter, categoriesFilter],
        (data) => {
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
        }
      )

      if (warning) {
        toast({
          variant: 'destructive',
          title: 'Budget Warning',
          description: warning
        })
      } else {
        toast({
          variant: 'default',
          title: 'Expense Created Successfully',
          description: 'Your expense was created and added to the table.'
        })
      }

      setIsOpen(false)
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          className="h-8"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> <span>New Expense</span>
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
                              format(new Date(field.value), 'PPP')
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
                          selected={field.value || null}
                          onSelect={(date) =>
                            field.onChange(date || new Date())
                          }
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
