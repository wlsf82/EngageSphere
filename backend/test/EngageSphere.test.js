/* eslint-env mocha */
const request = require('supertest')
const { expect } = require('chai')
const app = 'http://localhost:3001'

describe('EngageSphere API', () => {
  const CUSTOMERS_API_URL = '/customers'

  context('General', () => {
    it('returns the correct status and body structure on a simple get request (with default query params.)', async () => {
      const res = await request(app)
        .get(CUSTOMERS_API_URL)
        .expect(200)

      expect(res.body).to.have.all.keys('customers', 'pageInfo')

      res.body.customers.forEach(customer => {
        expect(customer.id).to.exist.and.be.a('number')
        expect(customer.name).to.exist.and.be.a('string')
        expect(customer.employees).to.exist.and.be.a('number')
        expect(customer.industry).to.exist.and.be.a('string')

        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.all.keys('name', 'email')
          expect(customer.contactInfo.name).to.be.a('string')
          expect(customer.contactInfo.email).to.be.a('string')
        }

        if (customer.address) {
          expect(customer.address).to.have.all.keys('street', 'city', 'state', 'zipCode', 'country')
          expect(customer.address.street).to.be.a('string')
          expect(customer.address.city).to.be.a('string')
          expect(customer.address.state).to.be.a('string')
          expect(customer.address.zipCode).to.be.a('string')
          expect(customer.address.country).to.be.a('string')
        }
      })

      expect(res.body.pageInfo).to.have.all.keys('currentPage', 'totalPages', 'totalCustomers')
      expect(res.body.pageInfo.currentPage).to.be.a('number')
      expect(res.body.pageInfo.totalPages).to.be.a('number')
      expect(res.body.pageInfo.totalCustomers).to.be.a('number')
    })

    it('returns an empty array of customers when in an empty page', async () => {
      const res = await request(app)
        .get(`${CUSTOMERS_API_URL}?page=6&limit=10`) // Supposing there are 50 clients in the database.
        .expect(200)

      expect(res.body.customers).to.be.a('array').and.be.empty
    })
  })

  context('Pagination', () => {
    it('gets customers from page 2', async () => {
      const res = await request(app)
        .get(`${CUSTOMERS_API_URL}?page=2`)
        .expect(200)

      expect(res.body.pageInfo.currentPage).to.eq(2)
      expect(res.body.customers.length).to.eq(10)
    })

    it('filters by limit of customers', async () => {
      const resultsPerPageLimit = [5, 10, 20, 50]
      const totalPagesPerLimit = [10, 5, 3, 1] // Supposing there are 50 clients in the database.

      const requests = resultsPerPageLimit.map(limit =>
        request(app)
          .get(`${CUSTOMERS_API_URL}?limit=${limit}`)
          .expect(200)
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const limit = resultsPerPageLimit[index]
        expect(res.body.customers).to.have.length(limit)
        expect(res.body.pageInfo.totalPages).to.be.eq(totalPagesPerLimit[index])
      })
    })
  })

  context('Size filtering', () => {
    it('filters customers by size', async () => {
      const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
      const limitOfEmployeesPerSize = [99, 999, 9999, 49999, 999999] // Assuming that there aren't companies with more than 999999 employees in the database

      const requests = sizes.map(size =>
        request(app)
          .get(`${CUSTOMERS_API_URL}?size=${size}`)
          .expect(200)
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const size = sizes[index]
        res.body.customers.forEach(customer => {
          expect(customer.size).to.eq(size)
          expect(customer.employees).to.be.lte(limitOfEmployeesPerSize[index])
        })
      })
    })
  })

  context('Industry filtering', () => {
    it('filters customers by industry', async () => {
      const industries = ['Logistics', 'Retail', 'Technology', 'HR', 'Finance']

      const requests = industries.map(industry =>
        request(app)
          .get(`${CUSTOMERS_API_URL}?industry=${industry}`)
          .expect(200)
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const industry = industries[index]
        res.body.customers.forEach(customer => {
          expect(customer.industry).to.eq(industry)
        })
      })
    })
  })

  context('Error scenarios', () => {
    const testCases = [
      { description: 'negative page', query: 'page=-1', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'negative limit', query: 'limit=-1', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'page=0', query: 'page=0', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'limit=0', query: 'limit=0', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'page as a string', query: 'page=One', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'limit as a boolean', query: 'limit=true', error: 'Invalid page or limit. Both must be positive numbers.' },
      { description: 'unsupported size', query: 'size=UnsupportedSize', error: 'Unsupported size value' },
      { description: 'unsupported industry', query: 'industry=UnsupportedIndustry', error: 'Unsupported industry value' }
    ]

    testCases.forEach(({ description, query, error }) => {
      it(`handles invalid requests gracefully (e.g., ${description})`, async () => {
        const res = await request(app)
          .get(`${CUSTOMERS_API_URL}?${query}`)
          .expect(400)

        expect(res.body.error).to.include(error)
      })
    })
  })
})
