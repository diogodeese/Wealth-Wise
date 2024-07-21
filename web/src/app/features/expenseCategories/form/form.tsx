import { createExpenseCategory } from '@/api/expense-categories/create-expense-category'
import { updateExpenseCategory } from '@/api/expense-categories/update-expense-category'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Button } from '@/app/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
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

interface ExpenseCategoriesFormProps {
  mode: 'create' | 'edit'
  category?: ExpenseCategory
  onClose: () => void
  isOpen: boolean
}

export function ExpenseCategoriesForm({
  mode,
  category,
  onClose,
  isOpen
}: ExpenseCategoriesFormProps) {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof expenseCategoriesFormSchema>>({
    resolver: zodResolver(expenseCategoriesFormSchema),
    defaultValues: {
      name: category?.name ?? '',
      essential: category?.essential ?? false,
      recurring: category?.recurring ?? false,
      description: category?.description ?? ''
    }
  })

  const { reset } = form

  // Mutation function should handle both create and update
  const mutationFn = async (data: {
    id?: string
    name: string
    essential: boolean
    recurring: boolean
    description: string
  }) => {
    if (mode === 'create') {
      return createExpenseCategory(data)
    } else {
      if (!data.id) throw new Error('ID is required for updating')
      return updateExpenseCategory(data.id, data)
    }
  }

  const mutationKey =
    mode === 'create'
      ? ['create-expense-category']
      : ['update-expense-category']

  const { mutateAsync: handleCategoryFn } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(response: ExpenseCategory) {
      const updatedCategory: ExpenseCategory = response
      queryClient.setQueryData<ExpenseCategory[] | undefined>(
        ['expense-categories'],
        (data) => {
          if (mode === 'create') {
            const newData = data
              ? [...data, updatedCategory]
              : [updatedCategory]
            newData.sort((a, b) => (a.id < b.id ? -1 : 1))
            return newData
          } else {
            const newData = data
              ? data.map((cat) =>
                  cat.id === updatedCategory.id ? updatedCategory : cat
                )
              : [updatedCategory]
            return newData
          }
        }
      )
      // Close and reset the form
      onClose()
      reset()
    }
  })

  async function onSubmit(values: z.infer<typeof expenseCategoriesFormSchema>) {
    try {
      if (mode === 'create') {
        await handleCategoryFn(values)
      } else if (category) {
        await handleCategoryFn({ ...values, id: category.id })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Add Expense Category'
              : 'Edit Expense Category'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Fill out the form below to add a new expense category to your account.'
              : 'Modify the details of the selected expense category.'}
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
                        onCheckedChange={(checked) => field.onChange(checked)}
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
                        onCheckedChange={(checked) => field.onChange(checked)}
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

            <Button type="submit">
              {mode === 'create' ? 'Submit' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
