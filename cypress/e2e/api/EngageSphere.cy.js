describe('EngageSphere API', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

  context('General', () => {
    it('returns the correct status and body structure on a simple get request (with default query params.)', () => {
      cy.request('GET', CUSTOMERS_API_URL).as('getCustomers')

      cy.get('@getCustomers')
        .its('status')
        .should('eq', 200)

      cy.get('@getCustomers')
        .its('body')
        .should('have.all.keys', 'customers', 'pageInfo')
      cy.get('@getCustomers')
        .its('body.customers')
        .each(customer => {
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

      cy.get('@getCustomers')
        .its('body.pageInfo')
        .should('have.all.keys', 'currentPage', 'totalPages', 'totalCustomers')
      cy.get('@getCustomers')
        .its('body.pageInfo')
        .then(({ currentPage, totalPages, totalCustomers }) => {
          expect(currentPage).to.be.a('number')
          expect(totalPages).to.be.a('number')
          expect(totalCustomers).to.be.a('number')
        })
    })

    it('returns an empty array of customers when in an empty page', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=6&limit=10`)
        .as('getEmptyCustomers') // Supposing there are 50 clients in the database.

      cy.get('@getEmptyCustomers')
        .its('body.customers')
        .should('be.a', 'array')
        .and('be.empty')
    })
  })

  context('Pagination', () => {
    it('gets customers from page 2', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=2`).as('getCustomersPageTwo')

      cy.get('@getCustomersPageTwo')
        .its('body.pageInfo.currentPage')
        .should('eq', 2) // Supposing there are at least 2 pages
      cy.get('@getCustomersPageTwo')
        .its('body.customers.length')
        .should('be.eq', 10) // Since ten is the default limit
    })

    it('filters by limit of customers', () => {
      const resultsPerPageLimit = [5, 10, 20, 50]
      const totalPagesPerLimit = [10, 5, 3, 1] // Supposing there are 50 clients in the database.

      resultsPerPageLimit.forEach((limit, index) => {
        cy.request('GET', `${CUSTOMERS_API_URL}?limit=${limit}`).as('getLimittedCustomers')

        cy.get('@getLimittedCustomers')
          .its('body.customers')
          .should('have.length', limit)
        cy.get('@getLimittedCustomers')
          .its('body.pageInfo.totalPages')
          .should('be.eq', totalPagesPerLimit[index])
      })
    })
  })

  context('Size filtering', () => {
    it('filters customers by size', () => {
      const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
      const limitOfEmployeesPerSize = [99, 999, 9999, 49999, 999999] // Assuming that there aren't companies with more than 999999 employees in the database

      sizes.forEach((size, index) => {
        cy.request('GET', `${CUSTOMERS_API_URL}?size=${size}`).as('getSizedCustomers')

        cy.get('@getSizedCustomers')
          .its('body.customers')
          .each(customer => {
            expect(customer.size).to.eq(size)
            expect(customer.employees).to.be.lte(limitOfEmployeesPerSize[index])
          })
      })
    })
  })

  context('Industry filtering', () => {
    it('filters customers by industry', () => {
      const industries = ['Logistics', 'Retail', 'Technology', 'HR', 'Finance']

      industries.forEach(industry => {
        cy.request('GET', `${CUSTOMERS_API_URL}?industry=${industry}`).as('getIndustryCustomers')

        cy.get('@getIndustryCustomers')
          .its('body.customers')
          .each(customer => {
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
      it(`handles invalid requests gracefully (e.g., ${description})`, () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?${query}`,
          failOnStatusCode: false,
        }).then(({ status, body }) => {
          expect(status).to.eq(400)
          expect(body.error).to.include(error)
        })
      })
    })
  })
})
