export const getExpensesDocs = {
  summary: 'Get user expenses',
  description:
    'Retrieve a list of expenses for the authenticated user. You can filter by category and date range.',
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'categories',
      in: 'query',
      description: 'Comma-separated list of category IDs to filter expenses by',
      required: false,
      schema: {
        type: 'string',
        example: 'category123,category456'
      }
    },
    {
      name: 'from',
      in: 'query',
      description: 'Start date of the range filter (YYYY-MM-DD)',
      required: false,
      schema: {
        type: 'string',
        format: 'date',
        example: '2024-10-01'
      }
    },
    {
      name: 'to',
      in: 'query',
      description: 'End date of the range filter (YYYY-MM-DD)',
      required: false,
      schema: {
        type: 'string',
        format: 'date',
        example: '2024-10-31'
      }
    }
  ],
  responses: {
    200: {
      description: 'List of user expenses',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: 'expense123'
                    },
                    amount: {
                      type: 'number',
                      example: 100.5
                    },
                    description: {
                      type: 'string',
                      example: 'Groceries'
                    },
                    category: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          example: 'Groceries'
                        }
                      }
                    },
                    date: {
                      type: 'string',
                      format: 'date',
                      example: '2024-10-15'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    400: {
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
                      example: 'Invalid date format'
                    },
                    path: {
                      type: 'array',
                      items: {
                        type: 'string',
                        example: 'from'
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
