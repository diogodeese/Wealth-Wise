export const getTotalExpensesWithAverageLastTwelveMonthsDocs = {
  summary: 'Total and Average Expenses for Last 12 Months',
  description:
    'Retrieves total expenses for each month over the last 12 complete months and calculates the average expense amount.',
  operationId: 'getTotalExpensesWithAverageLastTwelveMonths',
  tags: ['Expenses'],
  security: [{ bearerAuth: [] }],
  responses: {
    '200': {
      description:
        'Successfully retrieved total expenses and average for the last 12 months.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              totalExpensesByMonth: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    month: { type: 'string', example: '10/2023' },
                    totalAmount: {
                      type: 'number',
                      format: 'float',
                      example: 250.75
                    }
                  }
                }
              },
              averageTotalAmount: {
                type: 'number',
                format: 'float',
                example: 200.3
              }
            }
          }
        }
      }
    },
    '401': {
      description: 'Unauthorized request when user is not authenticated.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'User not authenticated' }
            }
          }
        }
      }
    },
    '404': {
      description:
        'Not Found when no expenses are found for the last 12 months.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'No expenses found for the last 12 months'
              }
            }
          }
        }
      }
    },
    '500': {
      description: 'Internal Server Error due to unexpected issues.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Internal Server Error' }
            }
          }
        }
      }
    }
  }
}
