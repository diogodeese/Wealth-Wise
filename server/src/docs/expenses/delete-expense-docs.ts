export const deleteExpenseDocs = {
  summary: 'Delete an expense',
  description:
    'Deletes an expense for the authenticated user. Requires a valid token.',
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'path',
      name: 'expenseId',
      required: true,
      description: 'The ID of the expense to delete',
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    204: {
      description: 'Expense deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Expense deleted successfully'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'Expense not found or does not belong to the user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Expense not found'
              }
            }
          }
        }
      }
    },
    401: {
      description: 'Unauthorized - token is missing or invalid',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal server error'
              }
            }
          }
        }
      }
    }
  }
}
