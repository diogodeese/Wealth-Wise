import { useExpenseCategories } from '@/api/get-expense-categories'
import { Table } from '@tanstack/react-table'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button'
import { DatePickerWithRange } from '../components/ui/date-range-picker'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'
import { DataTableFacetedFilter } from './faceted-filter'
import { ExpensesForm } from './form'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function Toolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const { data: categories } = useExpenseCategories()

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

        <Button variant="outline" className="h-8">
          <Search width={12} height={12} />
        </Button>

        {table.getColumn('date') && <DatePickerWithRange />}

        {table.getColumn('categoryName') && (
          <DataTableFacetedFilter
            column={table.getColumn('categoryName')}
            title="Category"
            options={filterableCategories}
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
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replace(/(\p{Lu})/gu, ' $1').trim()}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
