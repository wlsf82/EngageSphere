describe('EngageSphere - Mocks Server', () => {
  beforeEach(() => {
    cy.mocksSetDelay(0)
  })

  context('DB with customers', () => {
    beforeEach(() => {
      cy.mocksUseRouteVariant('get-customers:with-customers')
      cy.visit('/')
    })

    it('displays the first five customers', () => {
      cy.get('table tbody tr')
        .should('have.length', 5)
        .and('be.visible')
    })

    it('displays the next five customers', () => {
      cy.intercept({
        pathname: '/customers',
        query: {
          page: '2',
        },
      }).as('getPageTwoCustomers')

      cy.contains('button', 'Next').click()
      cy.wait('@getPageTwoCustomers')

      cy.get('table tbody tr')
        .should('have.length', 5)
        .and('be.visible')
        .first()
        .should('contain', 'Rudolf, Stainfield')
    })
  })

  context('DB with no customers', () => {
    beforeEach(() => {
      cy.mocksUseRouteVariant('get-customers:no-customers')
      cy.visit('/')
    })

    it('displays the image of an empty box and an informative text', () => {
      cy.get('[alt="image of an empty box"]').should('be.visible')
      cy.contains('span', 'No customers available.').should('be.visible')
    })
  })

  context('Slow API', () => {
    beforeEach(() => {
      cy.mocksSetDelay(1500)
      cy.mocksUseRouteVariant('get-customers:with-customers')
      cy.visit('/')
    })

    it('displays a loading fallback before showing the customers table', () => {
      cy.contains('p', 'Loading...').should('be.visible')

      cy.get('table tbody tr')
        .should('have.length', 5)
        .and('be.visible')
    })
  })
})
