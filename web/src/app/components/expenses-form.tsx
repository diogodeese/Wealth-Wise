import { useExpenseCategories } from '@/api/get-expense-categories'
import { Button } from '@/app/components/ui/button'
import { Calendar } from '@/app/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Combobox } from './ui/combobox'

const expensesFormSchema = z.object({
  expense: z.string().min(2, {
    message: 'Need to write an expense name'
  }),
  category: z.string(),
  date: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!"
  })
})

export function ExpensesForm() {
  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      expense: '',
      category: '',
      date: new Date()
    }
  })

  function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    console.log(values.date.toLocaleDateString('en-GB'))
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
        <Button variant="outline">
          <Plus width={12} height={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>
          <DialogDescription>
            Add an expense to your account here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense</FormLabel>
                  <FormControl>
                    <Input placeholder="Coffee" {...field} />
                  </FormControl>
                  <FormDescription>This is your expense name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Combobox
                    label="Select Category"
                    data={comboboxCategories || []}
                    onSelect={(categoryId: string) => {
                      const selectedCategory = categories?.find(
                        (category) => category?.id === categoryId
                      )

                      if (selectedCategory) {
                        field.value = selectedCategory.id
                      }
                    }}
                  />
                  <FormDescription>Category...</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
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
                    Just to keep your expense organized
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
