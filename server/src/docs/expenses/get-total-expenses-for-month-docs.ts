export const getTotalExpensesForMonthDocs = {
  summary: 'Retrieve total expenses for a specific month',
  description:
    'Returns the total expenses for a given month and year for the authenticated user.',
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'month',
      in: 'query',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1,
        maximum: 12
      },
      description: 'The month for which to retrieve expenses (1-12).'
    },
    {
      name: 'year',
      in: 'query',
      required: true,
      schema: {
        type: 'integer',
        minimum: 1000,
        maximum: 9999
      },
      description: 'The year for which to retrieve expenses.'
    }
  ],
  responses: {
    200: {
      description: 'Total expenses for the specified month and year',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  totalExpensesForMonth: {
                    type: 'number',
                    example: 1500.5
                  }
                }
              }
            }
          }
        }
      }
    },
    400: {
      description: 'Invalid request parameters',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Invalid request parameters'
              },
              details: {
                type: 'string',
                example:
                  'Month must be between 1 and 12, and year must be a valid four-digit number'
              }
            }
          }
        }
      }
    },
    401: {
      description: 'User not authenticated',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'User not authenticated'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'User not found'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal Server Error'
              }
            }
          }
        }
      }
    }
  }
}
