import { Expense, columns } from './columns'
import { DataTable } from './data-table'

function generateRandomExpenses(): Expense[] {
  const expenses: Expense[] = []

  for (let i = 0; i < 100; i++) {
    const id = Math.random().toString(36).substr(2, 9) // Generate a random ID

    const startDate = new Date(2023, 0, 1).getTime() // Start date: 01-01-2023
    const endDate = Date.now() // End date: Current date
    const randomDate = new Date(
      startDate + Math.random() * (endDate - startDate)
    )

    // Format the date as "dd/mm/yyyy"
    const date =
      ('0' + randomDate.getDate()).slice(-2) +
      '/' +
      ('0' + (randomDate.getMonth() + 1)).slice(-2) +
      '/' +
      randomDate.getFullYear()

    const categories = ['Entertainment', 'Groceries', 'Other'] // Available categories
    const category = categories[Math.floor(Math.random() * categories.length)]
    const description = 'Random Description' // Random description

    // Generate a random amount with 2 digits after the comma
    const amount = (Math.random() * 1000).toFixed(2)

    const currencies = ['USD', 'EUR'] // Available currencies
    const currency = currencies[Math.floor(Math.random() * currencies.length)]

    const paymentMethods = ['Cash', 'Debit Card', 'Credit Card'] // Available payment methods
    const paymentMethod =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

    const locations = ['Lisbon', 'Porto', 'Madrid', 'Barcelona', 'Paris'] // Available locations
    const location = locations[Math.floor(Math.random() * locations.length)]

    const receipt = Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit receipt number

    const expense: Expense = {
      id,
      date,
      category,
      description,
      amount,
      currency,
      paymentMethod,
      location,
      receipt: receipt.toString()
    }

    expenses.push(expense)
  }

  return expenses
}

export default function ExpensesTable() {
  const data = generateRandomExpenses()

  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
