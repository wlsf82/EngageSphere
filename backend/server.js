const port = 3001
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const database = require('./db')

const getSize = (customer) =>
  customer.employees <= 100 ? 'Small' : customer.employees <= 1000 ? 'Medium' : 'Big'


app.post('/', (req, res) => {
  const { name } = req.body
  const response = {
    name, 
    timestamp: (new Date()).toDateString(),
    customers: database.customers.map(customer => {
      customer.size = getSize(customer)
      return customer
    })
  }
  res.set('Access-Control-Allow-Origin', '*')
  return res.json(response)
})

app.listen(port, () => console.log(`Backend app listening on port ${port}!`))
