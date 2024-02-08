import fastify from 'fastify'
import { createdExpenseCategory } from './routes/create-expense-category'
import { getExpenseCategories } from './routes/get-expense-categories'

const app = fastify()

app.addHook('onRequest', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// app.register(expenseCategoryRoutes)

app.register(getExpenseCategories)
app.register(createdExpenseCategory)

app.listen({ port: 3000 }, () => {
  console.log(`HTTP server running.}`)
})
