describe('EngageSphere API', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

  context('General', () => {
    it('returns the correct status and body structure', () => {
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
          expect(customer.id).to.exist
          expect(customer.name).to.exist
          expect(customer.employees).to.exist
          expect(customer.industry).to.exist

          if (customer.contactInfo) {
            expect(customer.contactInfo.name).to.exist
            expect(customer.contactInfo.email).to.exist
          }

          if (customer.address) {
            expect(customer.address.street).to.exist
            expect(customer.address.city).to.exist
            expect(customer.address.state).to.exist
            expect(customer.address.zipCode).to.exist
            expect(customer.address.country).to.exist
          }
        })

      cy.get('@getCustomers')
        .its('body.pageInfo')
        .should('have.all.keys', 'currentPage', 'totalPages', 'totalCustomers')
    })

    it('returns an empty array of customers when in an empty page', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=6&limit=10`)
        .as('getEmptyCustomers') // Supposing there are 50 clients in the database.

      cy.get('@getEmptyCustomers')
        .its('body.customers')
        .should('be.empty')
    })
  })

  context('Pagination', () => {
    it('paginates the customer list correctly', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=2`).as('getCustomersPageTwo')

      cy.get('@getCustomersPageTwo')
        .its('body.pageInfo.currentPage')
        .should('eq', '2') // Supposing there are at least 2 pages
    })

    it('filters limit of customers correctly', () => {
      const resultsPerPageLimit = ['5', '10', '20', '50']
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
    it('filters customers by size correctly', () => {
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
    it('filters customers by industry correctly', () => {
      const industries = ['Logistics', 'Retail', 'Technology', 'HR', 'Finance']

      industries.forEach(industry => {
        cy.request('GET', `${CUSTOMERS_API_URL}?industry=${industry}`).as('getIndustryedCustomers')

        cy.get('@getIndustryedCustomers')
          .its('body.customers')
          .each(customer => {
            expect(customer.industry).to.eq(industry)
          })
      })
    })
  })

  context('Error scenarios', () => {
    it('handles invalid requests gracefully (e.g., negative page)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=-1`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., negative limit)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=-1`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., page=0)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=0`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., limit=0)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=0`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., page as a string)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=One`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., limit as a boolean)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=true`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
      })
    })

    it('handles invalid requests gracefully (e.g., unsupported size)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?size=UnsupportedSize`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Unsupported size value')
      })
    })

    it('handles invalid requests gracefully (e.g., unsupported industry)', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?industry=UnsupportedIndustry`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.include('Unsupported industry value')
      })
    })
  })
})
