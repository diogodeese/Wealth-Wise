import cors from '@fastify/cors'
import fastify from 'fastify'
import { createExpense } from './routes/create-expense'
import { createExpenseCategory } from './routes/create-expense-category'
import { getExpenseCategories } from './routes/get-expense-categories'
import { getExpenses } from './routes/get-expenses'
import { loginUser } from './routes/login-user'
import { regenerateToken } from './routes/regenerate-token'
import { registerUser } from './routes/register-user'
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

app.register(loginUser)
app.register(registerUser)
app.register(verifyToken)
app.register(regenerateToken)
app.register(getExpenseCategories)
app.register(createExpenseCategory)
app.register(getExpenses)
app.register(createExpense)

app.listen({ port: 3000 }, () => {
  console.log(`HTTP server running.`)
})
