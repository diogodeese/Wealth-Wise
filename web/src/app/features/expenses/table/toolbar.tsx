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
import { ExpensesForm } from '../form/form'
import { DataTableFacetedFilter } from './faceted-filter'

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
