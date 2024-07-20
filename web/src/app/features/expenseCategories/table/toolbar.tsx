import { Button } from '@/app/shared/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ExpenseCategoriesForm } from '../form/form'

export default function Toolbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFormClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-row">
      <div className="flex items-center gap-2">
        <ExpenseCategoriesForm
          mode="create"
          onClose={handleFormClose}
          isOpen={isDialogOpen}
        />
        <Button
          variant={'outline'}
          size={'sm'}
          className="h-8"
          onClick={() => setIsDialogOpen(true)}
        >
          <>
            <Plus className="mr-2 h-4 w-4" />
            <span>New category</span>
          </>
        </Button>
      </div>
    </div>
  )
}
