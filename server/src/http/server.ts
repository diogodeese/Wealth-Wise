import cors from '@fastify/cors'
import fastify from 'fastify'
import { loginUser } from './routes/auth/login-user'
import { regenerateToken } from './routes/auth/regenerate-token'
import { registerUser } from './routes/auth/register-user'
import { verifyToken } from './routes/auth/verify-token'
import { createExpenseCategory } from './routes/expense-categories/create-expense-category'
import { deleteExpenseCategory } from './routes/expense-categories/delete-expense-category'
import { getExpenseCategories } from './routes/expense-categories/get-expense-categories'
import { updateExpenseCategory } from './routes/expense-categories/update-expense-category'
import { createExpense } from './routes/expenses/create-expense'
import { deleteExpense } from './routes/expenses/delete-expense'
import { getExpenses } from './routes/expenses/get-expenses'
import { getTotalExpensesForMonth } from './routes/expenses/get-total-expenses-for-month'
import { getTotalExpensesForYear } from './routes/expenses/get-total-expenses-for-year'
import { getTotalExpensesWithAverageLastTwelveMonths } from './routes/expenses/get-total-expenses-with-average-last-twelve-months'
import { getCountries } from './routes/get-countries'
import { getCurrencies } from './routes/get-currencies'

const app = fastify()

app.register(cors, {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
})

app.register(async (app, opts) => {
  app.addHook('onRequest', (req, res, next) => {
    // Set headers for CORS
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })
})

// Authentication
app.register(loginUser)
app.register(registerUser)
app.register(verifyToken)
app.register(regenerateToken)

// Dataset's
app.register(getCountries)
app.register(getCurrencies)

// Expenses
app.register(getExpenses)
app.register(getTotalExpensesForMonth)
app.register(getTotalExpensesForYear)
app.register(getTotalExpensesWithAverageLastTwelveMonths)
app.register(createExpense)
app.register(deleteExpense)

// Expense Categories
app.register(getExpenseCategories)
app.register(createExpenseCategory)
app.register(updateExpenseCategory)
app.register(deleteExpenseCategory)

app.listen({ port: 3000 }, () => {
  console.log(`HTTP server running.`)
})
