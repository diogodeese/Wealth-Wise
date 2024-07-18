import { createExpenseCategory } from '@/api/create-expense-category'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Button } from '@/app/shared/components/ui/button'
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
import { Textarea } from '@/app/shared/components/ui/textarea'
import ExpenseCategory from '@/types/expense-category'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const expenseCategoriesFormSchema = z.object({
  name: z.string(),
  essential: z.boolean(),
  recurring: z.boolean(),
  description: z.string().max(256, {
    message: 'Descriptions must be smaller than 256 characters'
  })
})

export function ExpenseCategoriesForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof expenseCategoriesFormSchema>>({
    resolver: zodResolver(expenseCategoriesFormSchema),
    defaultValues: {
      name: '',
      essential: false,
      recurring: false,
      description: ''
    }
  })

  const { mutateAsync: createExpenseCategoryFn } = useMutation({
    mutationKey: ['create-expense-category'],
    mutationFn: createExpenseCategory,
    onSuccess(response: ExpenseCategory) {
      const expenseCategory: ExpenseCategory = response

      queryClient.setQueryData<ExpenseCategory[] | undefined>(
        ['expense-categories'],
        (data) => {
          const newData = data ? [...data] : []

          newData.push({
            id: expenseCategory.id,
            name: expenseCategory.name,
            essential: expenseCategory.essential,
            recurring: expenseCategory.recurring,
            description: expenseCategory.description
          })

          newData.sort((a, b) => (a.id < b.id ? -1 : 1))

          return newData
        }
      )
    }
  })

  async function onSubmit(values: z.infer<typeof expenseCategoriesFormSchema>) {
    try {
      await createExpenseCategoryFn(values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'sm'} className="h-8">
          <Plus className="mr-2 h-4 w-4" />
          <span>New category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Expense Category</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new expense category to your
            account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      className="block w-full rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a name for the category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="essential"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2">
                    <FormControl>
                      <Checkbox
                        id="essential"
                        className="mt-[6px]"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel
                        htmlFor="essential"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Essential
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Mark if this category is a necessary expense.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recurring"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2">
                    <FormControl>
                      <Checkbox
                        id="recurring"
                        className="mt-[6px]"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel
                        htmlFor="recurring"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Recurring
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Indicate if this expense repeats regularly.
                      </FormDescription>
                    </div>
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
                      placeholder="Enter category description"
                      className="block max-h-40 w-full rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a description for the category.
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
