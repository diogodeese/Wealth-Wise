import { Button } from '@/app/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'
import { Plus, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { RecurringExpensesForm } from '../form/form'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function Toolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFormClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-row">
      <div className="flex items-center gap-2">
        <RecurringExpensesForm
          mode="create"
          onClose={handleFormClose}
          isOpen={isDialogOpen}
        />
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => setIsDialogOpen(true)}
        >
          <>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Recurring Expense</span>
          </>
        </Button>
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
