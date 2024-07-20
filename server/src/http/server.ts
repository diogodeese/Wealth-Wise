import cors from '@fastify/cors'
import fastify from 'fastify'
import { createExpense } from './routes/create-expense'
import { createExpenseCategory } from './routes/create-expense-category'
import { deleteExpense } from './routes/delete-expense'
import { deleteExpenseCategory } from './routes/delete-expense-category'
import { getCountries } from './routes/get-countries'
import { getCurrencies } from './routes/get-currencies'
import { getExpenseCategories } from './routes/get-expense-categories'
import { getExpenses } from './routes/get-expenses'
import { getTotalExpensesForMonth } from './routes/get-total-expenses-for-month'
import { getTotalExpensesForYear } from './routes/get-total-expenses-for-year'
import { getTotalExpensesWithAverageLastTwelveMonths } from './routes/get-total-expenses-with-average-last-twelve-months'
import { loginUser } from './routes/login-user'
import { regenerateToken } from './routes/regenerate-token'
import { registerUser } from './routes/register-user'
import { updateExpenseCategory } from './routes/update-expense-category'
import { verifyToken } from './routes/verify-token'

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
