const PORT = process.env.PORT || 3001
const express = require('express')
const app = express()

const database = require('./db')

const allowedOrigins = ['https://engage-sphere.vercel.app', 'http://localhost:3000']

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
})

const getSize = ({ employees }) => {
  if (employees >= 50000) return 'Very Large Enterprise'
  if (employees >= 10000) return 'Large Enterprise'
  if (employees >= 1000) return 'Enterprise'
  if (employees >= 100) return 'Medium'
  return 'Small'
}

app.get('/customers', (req, res) => {
  const { page = 1, limit = 10, size = 'All' } = req.query
  const validSizes = ['Small', 'Medium',  'Enterprise', 'Large Enterprise', 'Very Large Enterprise', 'All']

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).json({error: 'Invalid page or limit. Both must be positive numbers.'})
  }

  if (!validSizes.includes(size)) {
    return res.status(400).json({ error: 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.' })
  }

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  let filteredCustomers = database.customers

  if (size != 'All') {
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

  return res.json(response)
})

app.listen(PORT, () => console.log(`Backend app listening on port ${PORT}!`))
