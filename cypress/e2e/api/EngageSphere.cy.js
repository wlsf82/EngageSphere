describe('EngageSphere Customers API', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

  it('successfully retrieves customers', () => {
    cy.request('POST', CUSTOMERS_API_URL, { page: 1, limit: 10 })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  it('paginates the customer list correctly', () => {
    cy.request('POST', CUSTOMERS_API_URL, { page: 2, limit: 5 })
      .then((response) => {
        expect(response.body.customers).to.have.length(5)
        expect(response.body.pageInfo.currentPage).to.eq(2)
      })
  })

  it('filters customers by size correctly', () => {
    const sizes = ['Small', 'Medium', 'Big']
    sizes.forEach((size) => {
      cy.request('POST', CUSTOMERS_API_URL, { size })
        .then((response) => {
          response.body.customers.forEach((customer) => {
            expect(customer.size).to.eq(size)
          })
        })
    })
  })

  it('returns the correct structure of the response', () => {
    cy.request('POST', CUSTOMERS_API_URL, { page: 1, limit: 10 })
      .then((response) => {
        expect(response.body).to.have.all.keys('customers', 'pageInfo')
        expect(response.body.pageInfo).to.include.keys('currentPage', 'totalPages', 'totalCustomers')
      })
  })

  it('handles invalid requests gracefully (e.g., negative page and limit)', () => {
    cy.request({
      method: 'POST',
      url: CUSTOMERS_API_URL,
      body: { page: -1, limit: 10 },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.include('Invalid page or limit. Both must be positive numbers.')
    })
  })
  
  it('handles invalid requests gracefully (e.g., unsupported size)', () => {
    cy.request({
      method: 'POST',
      url: CUSTOMERS_API_URL,
      body: {
        page: 1,
        limit: 10,
        size: 'UnsupportedSize', // Deliberately using an unsupported size value
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.include('Unsupported size value')
    })
  })
})
