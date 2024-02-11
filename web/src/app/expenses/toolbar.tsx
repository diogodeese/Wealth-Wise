import { useExpenseCategories } from '@/api/get-expense-categories'
import { Table } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'
import { Input } from '../components/ui/input'
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

        <Input
          placeholder="Filter description..."
          value={
            (table.getColumn('description')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className="h-8 max-w-sm"
        />
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
          <Button variant="outline" className="ml-auto gap-2">
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
