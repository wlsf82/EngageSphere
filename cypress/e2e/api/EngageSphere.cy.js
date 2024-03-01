describe('EngageSphere API', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

  it('successfully retrieves customers', () => {
    cy.request('POST', CUSTOMERS_API_URL, { page: 1, limit: 10 })
      .then(({ status }) => {
        expect(status).to.eq(200)
      })
  })

  it('paginates the customer list correctly', () => {
    // @TODO: Fix for the case there's only one page
    cy.request('POST', CUSTOMERS_API_URL, { page: 2, limit: 5 })
      .then(({ body }) => {
        expect(body.customers).to.have.length(5)
        expect(body.pageInfo.currentPage).to.eq(2)
      })
  })

  it('filters customers by size correctly', () => {
    const sizes = ['Small', 'Medium', 'Big']
    sizes.forEach((size) => {
      cy.request('POST', CUSTOMERS_API_URL, { size })
        .then(({ body }) => {
          body.customers.forEach((customer) => {
            expect(customer.size).to.eq(size)
          })
        })
    })
  })

  it('returns the correct structure of the response', () => {
    cy.request('POST', CUSTOMERS_API_URL, { page: 1, limit: 10 })
      .then(({ body }) => {
        expect(body).to.have.all.keys('customers', 'pageInfo')
        expect(body.pageInfo).to.include.keys('currentPage', 'totalPages', 'totalCustomers')
      })
  })

  it('handles invalid requests gracefully (e.g., negative page)', () => {
    cy.request({
      method: 'POST',
      url: CUSTOMERS_API_URL,
      body: { page: -1, limit: 10 },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
    })
  })
  
  it('handles invalid requests gracefully (e.g., negative limit)', () => {
    cy.request({
      method: 'POST',
      url: CUSTOMERS_API_URL,
      body: { page: 1, limit: -1 },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.')
    })
  })
  
  it('handles invalid requests gracefully (e.g., unsupported size)', () => {
    cy.request({
      method: 'POST',
      url: CUSTOMERS_API_URL,
      body: {
        page: 1,
        limit: 10,
        size: 'UnsupportedSize',
      },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.error).to.include('Unsupported size value')
    })
  })
})
