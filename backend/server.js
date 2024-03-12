const port = 3001
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const database = require('./db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const getSize = (customer) =>
  customer.employees <= 100 ? 'Small' : customer.employees <= 1000 ? 'Medium' : 'Big'

app.get('/customers', (req, res) => {
  const { page = 1, limit = 10, size = '' } = req.query
  const validSizes = ['Small', 'Medium', 'Big', '']

  if (page < 1 || limit < 1) {
    return res.status(400).json({error: 'Invalid page or limit. Both must be positive numbers.'})
  }

  if (!validSizes.includes(size)) {
    return res.status(400).json({ error: 'Unsupported size value. Supported values are Small, Medium, Big.' })
  }

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  let filteredCustomers = database.customers

  if (size) {
    filteredCustomers = filteredCustomers.filter(customer => getSize(customer) === size)
  }

  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex).map(customer => {
    customer.size = getSize(customer)
    return customer
  })

  const response = {
    customers: paginatedCustomers,
    pageInfo: {
      currentPage: page,
      totalPages: Math.ceil(filteredCustomers.length / limit),
      totalCustomers: filteredCustomers.length,
    }
  }

  res.set('Access-Control-Allow-Origin', '*')
  return res.json(response)
})

app.listen(port, () => console.log(`Backend app listening on port ${port}!`))
