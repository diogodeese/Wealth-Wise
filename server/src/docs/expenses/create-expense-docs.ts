export const createExpenseDocs = {
  summary: 'Create an expense',
  description: 'Create a new expense for the authenticated user.',
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              example: 100.5
            },
            description: {
              type: 'string',
              example: 'Groceries'
            },
            categoryId: {
              type: 'string',
              example: 'category123'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2024-10-15'
            }
          },
          required: ['amount', 'description', 'categoryId', 'date']
        }
      }
    }
  },
  responses: {
    '201': {
      description: 'Expense created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'expense456'
                  },
                  userId: {
                    type: 'string',
                    example: 'user123'
                  },
                  categoryId: {
                    type: 'string',
                    example: 'category123'
                  },
                  category: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'category123'
                      },
                      name: {
                        type: 'string',
                        example: 'Groceries'
                      },
                      budgetCap: {
                        type: 'number',
                        example: 500.0
                      }
                    }
                  },
                  amount: {
                    type: 'number',
                    example: 100.5
                  },
                  description: {
                    type: 'string',
                    example: 'Groceries'
                  },
                  date: {
                    type: 'string',
                    format: 'date',
                    example: '2024-10-15'
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-10-22T10:45:00Z'
                  },
                  warning: {
                    type: 'string',
                    example:
                      'You are about to exceed your budget for this category.'
                  }
                }
              }
            }
          }
        }
      }
    },
    '400': {
      description: 'Validation failed',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Validation failed'
              },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Invalid amount format'
                    },
                    path: {
                      type: 'array',
                      items: {
                        type: 'string',
                        example: 'amount'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '500': {
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
