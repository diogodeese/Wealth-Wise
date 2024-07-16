import { ExpenseCategoriesForm } from '../form/form'

export default function Toolbar() {
  return (
    <div className="flex flex-row">
      <div className="flex items-center gap-2">
        <ExpenseCategoriesForm />
      </div>
    </div>
  )
}
