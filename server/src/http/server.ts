import cors from '@fastify/cors'
import fastify from 'fastify'
import { loginUser } from './routes/auth/login-user'
import { registerUser } from './routes/auth/register-user'
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
import { getEmergencyFund } from './routes/get-emergency-fund'
import { createRecurringExpense } from './routes/recurring-expenses/create-recurring-expense'

import { cronJobRecurringExpenses } from '../cron-jobs/recurring-expenses'
import { getRecurringExpenses } from './routes/recurring-expenses/get-recurring-expenses'
import { updateRecurringExpense } from './routes/recurring-expenses/update-recurring-expense'

import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import { logoutUser } from './routes/auth/logout-user'
import { refreshToken } from './routes/auth/refresh-token'
import { validateToken } from './routes/auth/validate-token'

const app = fastify()

app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

app.register(async (app, opts) => {
  app.addHook('onRequest', (req, res, next) => {
    // Set headers for CORS
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
  })
})

app.register(cookie, {
  secret: 'my-secret', // for cookies signature
  parseOptions: {} // options for parsing cookies
} as FastifyCookieOptions)

// Authentication
app.register(loginUser)
app.register(logoutUser)
app.register(registerUser)
app.register(refreshToken)
app.register(validateToken)

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

// Emergency Fund
app.register(getEmergencyFund)

// Recurring Expenses
app.register(getRecurringExpenses)
app.register(createRecurringExpense)
app.register(updateRecurringExpense)

// Cron Jobs
cronJobRecurringExpenses.start()

app.listen({ port: 3000 }, () => {
  console.log(`HTTP server running.`)
})
