import fastify from 'fastify'
import { createExpense } from './routes/create-expense'
import { createExpenseCategory } from './routes/create-expense-category'
import { getExpenseCategories } from './routes/get-expense-categories'
import { getExpenses } from './routes/get-expenses'
import { loginUser } from './routes/login-user'
import { registerUser } from './routes/register-user'

const app = fastify()

app.addHook('onRequest', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.register(loginUser)
app.register(registerUser)
app.register(getExpenseCategories)
app.register(createExpenseCategory)
app.register(getExpenses)
app.register(createExpense)

app.listen({ port: 3000 }, () => {
  console.log(`HTTP server running.`)
})
