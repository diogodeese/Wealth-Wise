import { Button } from '@/app/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/app/shared/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

export function Actions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            console.log('edit')
          }}
        >
          <Pencil size={16} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400"
          onClick={() => {
            console.log('delete')
          }}
        >
          <Trash size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
