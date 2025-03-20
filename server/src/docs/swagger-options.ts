import swaggerJsdoc from 'swagger-jsdoc'
import { createExpenseDocs } from './expenses/create-expense-docs'
import { deleteExpenseDocs } from './expenses/delete-expense-docs'
import { getExpensesDocs } from './expenses/get-expenses-docs'
import { getTotalExpensesForMonthDocs } from './expenses/get-total-expenses-for-month-docs'
import { getTotalExpensesForYearDocs } from './expenses/get-total-expenses-for-year-docs'
import { getTotalExpensesWithAverageLastTwelveMonthsDocs } from './expenses/get-total-expenses-with-average-last-twelve-months-docs'

// OpenAPI/Swagger setup using swagger-jsdoc
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the development team'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    paths: {
      '/api/expenses': {
        get: getExpensesDocs,
        post: createExpenseDocs
      },
      '/api/expenses/{expensesId}': {
        delete: deleteExpenseDocs
      },
      '/api/total-expenses-for-month': {
        get: getTotalExpensesForMonthDocs
      },
      '/api/total-expenses-for-year': {
        get: getTotalExpensesForYearDocs
      },
      '/api/total-expenses-with-average-last-twelve-months': {
        get: getTotalExpensesWithAverageLastTwelveMonthsDocs
      }
    }
  },
  apis: ['./src/http/routes/**/*.ts', './src/docs/**/*.ts']
}

// Generate the OpenAPI specification
export const swaggerSpec = swaggerJsdoc(swaggerOptions)
