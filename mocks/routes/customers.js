const pageOneResponse = require('../../cypress/fixtures/customers.json')
const pageTwoResponse = require('../../cypress/fixtures/pageTwoCustomers.json')

module.exports = [
  {
    id: 'get-customers', // id of the route
    url: '*/customers*', // url in path-to-regexp format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'with-customers', // id of the variant
        type: 'middleware', // variant type
        options: {
          middleware: (req, res) => {
            res.status(200)
            if (req.query.page === '1') {
              res.send(pageOneResponse)
            } else {
              res.send(pageTwoResponse)
            }
          }
        }
      },
      {
        id: 'no-customers',
        type: 'text',
        options: {
          status: 200,
          body: ''
        }
      },
    ]
  }
]
