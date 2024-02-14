import { useCountries } from '@/api/get-countries'
import { useCurrencies } from '@/api/get-currency'
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
import { Combobox } from '../components/ui/combobox'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

const expensesFormSchema = z.object({
  amount: z.string(),
  category: z.string(),
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
  const form = useForm<z.infer<typeof expensesFormSchema>>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      amount: undefined,
      category: undefined,
      date: new Date(),
      description: undefined
    }
  })

  function onSubmit(values: z.infer<typeof expensesFormSchema>) {
    console.log(values)
  }

  const { data: categories } = useExpenseCategories()

  let comboboxCategories: { id: string; text: string }[] = []

  if (categories && Array.isArray(categories)) {
    comboboxCategories = categories.map((category) => ({
      id: category.id,
      text: category.name
    }))
  }

  const { data: countries } = useCountries()

  let comboboxCountries: { id: string; text: string }[] = []

  if (countries && Array.isArray(countries)) {
    comboboxCountries = countries.map((country) => ({
      id: country.id.toString(),
      text: country.name
    }))
  }

  const { data: currencies } = useCurrencies()

  let comboboxCurrencies: { id: string; text: string }[] = []

  if (currencies && Array.isArray(currencies)) {
    comboboxCurrencies = currencies.map((currency) => ({
      id: currency.id.toString(),
      text: `${currency.code} (${currency.symbol})`
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
                  <FormItem className="w-full">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.10"
                        placeholder="Enter amount"
                        className="block w-full rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the amount of the expense.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Combobox
                label="Select Currency"
                data={comboboxCurrencies || []}
                // onSelect={(categoryId: string) => {
                //   const selectedCategory = categories?.find(
                //     (category) => category?.id === categoryId
                //   )

                //   if (selectedCategory) {
                //     form.setValue('category', selectedCategory.id)
                //   }
                // }}
              />
            </div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="category"
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
                          form.setValue('category', selectedCategory.id)
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
            <Combobox
              label="Select Country"
              data={comboboxCountries || []}
              // onSelect={(categoryId: string) => {
              //   const selectedCategory = categories?.find(
              //     (category) => category?.id === categoryId
              //   )

              //   if (selectedCategory) {
              //     form.setValue('category', selectedCategory.id)
              //   }
              // }}
              defaultValue="181"
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
