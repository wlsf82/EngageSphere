const { faker } = require('@faker-js/faker/locale/en')
const { times } = require('lodash')

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

const numberOfCustomers = process.env.ENGAGESPHERE_NUMBER_OF_CUSTOMERS || 50
let initialId = 1

module.exports = {
  customers: times(numberOfCustomers, () => {
    return {
      id: initialId++,
      name: faker.company.name(),
      employees: Math.floor(Math.random() * 5000) + 1,
      contactInfo: randomlyGenContactInfo(),
    }
  })
}
