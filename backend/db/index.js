const { faker } = require('@faker-js/faker/locale/en')
const { times } = require('lodash')

const staticCustomers = require('./staticCustomers')

const randomlyGenContactInfo = () => {
  if (Math.random() > 0.5) {
    const name = faker.person.firstName()
    return {
      name,
      email: faker.internet.email({ firstName: name })
    }
  }
  return null
}

const numberOfDynamicCustomers = process.env.NUMBER_OF_DYNAMIC_CUSTOMERS || 42
let initialId = 9

const getRandomIntegerBetween = (n, m) => {
  // Ensure n and m are integers and n <= m
  const min = Math.ceil(Math.min(n, m))
  const max = Math.floor(Math.max(n, m))

  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomlyGenNumOfEmployees = () => {
  if (Math.random() > 0.8) return getRandomIntegerBetween(50000, 100000)
  if (Math.random() > 0.6) return getRandomIntegerBetween(10000, 49999)
  if (Math.random() > 0.4) return getRandomIntegerBetween(1000, 9999)
  if (Math.random() > 0.2) return getRandomIntegerBetween(500, 999)
  return getRandomIntegerBetween(1, 499)
}

const dynamicCustomers = times(numberOfDynamicCustomers, () => {
  return {
    id: initialId++,
    name: faker.company.name(),
    employees: randomlyGenNumOfEmployees(),
    contactInfo: randomlyGenContactInfo(),
  }
})

module.exports = {
  customers: [...staticCustomers, ...dynamicCustomers]
}
