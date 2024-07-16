import { useExpenseCategories } from '@/api/get-expense-categories'
import { Button } from '@/app/shared/components/ui/button'
import { DatePickerWithRange } from '@/app/shared/components/ui/date-range-picker'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { ExpensesForm } from '../form/form'
import { DataTableFacetedFilter } from './faceted-filter'

const expensesFilterSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  categories: z.array(z.string()).optional()
})

type ExpensesFilterSchema = z.infer<typeof expensesFilterSchema>

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function Toolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories } = useExpenseCategories()

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: undefined,
    to: undefined
  })

  // Initialize selectedCategories based on URL params or as empty array
  const initialCategories = searchParams.get('categories')?.split(',') || []
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories)

  // Effect to initialize selected date range from URL params
  useEffect(() => {
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')

    if (fromParam && toParam) {
      const fromDate = new Date(fromParam)
      const toDate = new Date(toParam)
      setSelectedDateRange({ from: fromDate, to: toDate })
    }
  }, [searchParams])

  const handleFilterExpenses = (filters: ExpensesFilterSchema) => {
    setSearchParams((state) => {
      if (filters.dateFrom) {
        state.set('from', filters.dateFrom)
      } else {
        state.delete('from')
      }

      if (filters.dateTo) {
        state.set('to', filters.dateTo)
      } else {
        state.delete('to')
      }

      if (filters.categories && filters.categories.length > 0) {
        state.set('categories', filters.categories.join(','))
      } else {
        state.delete('categories')
      }

      return state
    })
  }

  const handleSearch = () => {
    // Convert local dates to UTC dates before sending to setSearchParams
    const fromUTC = selectedDateRange?.from
      ? new Date(
          Date.UTC(
            selectedDateRange.from.getFullYear(),
            selectedDateRange.from.getMonth(),
            selectedDateRange.from.getDate()
          )
        )
      : undefined

    const toUTC = selectedDateRange?.to
      ? new Date(
          Date.UTC(
            selectedDateRange.to.getFullYear(),
            selectedDateRange.to.getMonth(),
            selectedDateRange.to.getDate()
          )
        )
      : undefined
    console.log(selectedCategories)
    handleFilterExpenses({
      dateFrom: fromUTC ? fromUTC.toISOString().split('T')[0] : undefined,
      dateTo: toUTC ? toUTC.toISOString().split('T')[0] : undefined,
      categories: selectedCategories
    })

    // Update table filters here if needed
  }

  const handleDateRangeChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange)
  }

  let filterableCategories: { value: string; label: string }[] = []

  if (categories && Array.isArray(categories)) {
    filterableCategories = categories.map((category) => ({
      value: category.id,
      label: category.name
    }))
  }

  return (
    <div className="flex flex-row">
      <div className="flex items-center gap-2">
        <ExpensesForm />

        <Button
          type="button"
          variant="outline"
          className="h-8 gap-2"
          onClick={handleSearch}
        >
          <Search width={16} height={16} /> <span>Filter</span>
        </Button>

        {table.getColumn('date') && (
          <DatePickerWithRange
            onChange={handleDateRangeChange}
            selected={selectedDateRange} // Pass selected prop here
          />
        )}

        {table.getColumn('categoryName') && (
          <DataTableFacetedFilter
            column={table.getColumn('categoryName')}
            title="Category"
            options={filterableCategories}
            onFilterChange={(selected) =>
              setSelectedCategories(Array.from(selected))
            }
            selectedCategories={selectedCategories} // Pass selectedCategories as prop
            onSearch={handleSearch} // Pass onSearch callback
            updateCategories={setSelectedCategories} // Pass updateCategories callback
          />
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto h-8 gap-2">
            <SlidersHorizontal size={16} />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id.replace(/(\p{Lu})/gu, ' $1').trim()}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
