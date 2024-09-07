const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'EngageSphere Server API',
      version: '1.0.0',
      description: 'Sample Express.js API that retrieves customers\'s + page\'s info (for pagination purposes)',
    },
    components: {
      schemas: {
        Customer: {
          type: 'object',
          required: ['id', 'name', 'address', 'segment'],
          properties: {
            id: {
              type: 'integer',
              minimum: 1,
              description: 'The unique identifier of the customer',
            },
            name: {
              type: 'string',
              description: 'The name of the company',
            },
            employees: {
              type: 'integer',
              minimum: 1,
              description: 'The number of employees in the company',
            },
            contactInfo: {
              type: 'object',
              nullable: true,
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of the person to contact in the company',
                },
                email: {
                  type: 'string',
                  description: 'The email of the person to contact in the company',
                },
              },
              description: 'The contact information in the company. It can be null',
            },
            address: {
              type: 'object',
              nullable: true,
              required: ['street', 'city', 'state', 'zipCode', 'country'],
              properties: {
                street: {
                  type: 'string',
                  description: 'The street address of the company',
                },
                city: {
                  type: 'string',
                  description: 'The city in which the company is located',
                },
                state: {
                  type: 'string',
                  description: 'The state in which the company is located',
                },
                zipCode: {
                  type: 'string',
                  description: 'The postal code for the company\'s location',
                },
                country: {
                  type: 'string',
                  description: 'The country in which the company is located',
                },
              },
              description: 'The mailing address of the company. It can be null',
            },
            segment: {
              type: 'string',
              enum: ['Logistics', 'Retail', 'Technology', 'HR', 'Finance'],
              description: 'The business segment of the company (Logistics, Retail, Technology, HR, Finance)',
            },
            size: {
              type: 'string',
              enum: ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'],
              description: 'The size of the company based on employee count',
            },
          },
          example: {
            id: 1,
            name: 'Jacobs Co',
            employees: 100,
            size: 'Small',
            segment: 'Logistics',
            contactInfo: {
              name: 'Joe',
              email: 'joe@jacobsco.com'
            },
            address: {
              street: '988 Kimberly Fort Apt. 921',
              city: 'Lake Tracy',
              state: 'Connecticut',
              zipCode: '07115',
              country: 'United States of America'
            }
          },
        },
        PageInfo: {
          type: 'object',
          properties: {
            currentPage: {
              type: 'integer',
              description: 'The current page number.',
            },
            totalPages: {
              type: 'integer',
              description: 'The total number of pages available.',
            },
            totalCustomers: {
              type: 'integer',
              description: 'The total number of customers across all pages.',
            },
          },
          example: {
            currentPage: 1,
            totalPages: 1,
            totalCustomers: 1,
          },
        },
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./server.js'],
}

const specs = swaggerJsdoc(options)

module.exports = specs
