export const getTotalExpensesForYearDocs = {
  summary: 'Get Total Yearly Expenses',
  description:
    'Retrieves the total expenses for a specified year for an authenticated user.',
  operationId: 'getTotalExpensesForYear',
  parameters: [
    {
      in: 'query',
      name: 'year',
      required: true,
      description: 'The four-digit year for which to retrieve total expenses.',
      schema: {
        type: 'integer',
        example: 2022
      }
    }
  ],
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    '200': {
      description:
        'Successfully retrieved total expenses for the specified year.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  totalExpensesForYear: {
                    type: 'number',
                    format: 'float',
                    example: 1500.5
                  }
                }
              }
            }
          }
        }
      }
    },
    '400': {
      description: 'Bad Request due to invalid year parameter.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Invalid request parameter'
              },
              details: {
                type: 'string',
                example: 'Year must be a valid four-digit number'
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
              error: {
                type: 'string',
                example: 'User not authenticated'
              }
            }
          }
        }
      }
    },
    '404': {
      description:
        'Not Found when no expenses are found for the specified year.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'No expenses found for the specified year'
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
