describe('EngageSphere Frontend', {
 viewportHeight: 1240,
 viewportWidth: 1024
}, () => {
  beforeEach(() => {
    const now = new Date(2024, 3, 15) // month is 0-indexed
    cy.clock(now)

    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { fixture: 'customers' }
    ).as('getCustomers')

    cy.visit('/')
    cy.wait('@getCustomers')
  })

  context('Greeting', () => {
    it('shows the default greeting', () => {
      cy.contains('p', 'Hi there! It is now Mon Apr 15 2024.')
        .should('be.visible')
    })

    it('shows a customized greeting (e.g., Hi Joe! ...)', () => {
      cy.get('input[type="text"]').type('Joe')
      cy.contains('p', 'Hi Joe! It is now Mon Apr 15 2024.')
        .should('be.visible')
    })
  })

  context('Sorting', () => {
    it('sorts by Size in descending order by default', () => {
      cy.contains('th', 'Size ↓').should('be.visible')
      cy.get('tbody tr')
        .first()
        .find('td')
        .eq(3)
        .should('contain', 'Big')

      cy.get('tbody tr')
        .last()
        .find('td')
        .eq(3)
        .should('contain', 'Small')
    })

    it('sorts by Size in ascending order', () => {
      cy.contains('th', 'Size').click()
      cy.contains('th', 'Size ↑').should('be.visible')
      cy.get('tbody tr')
        .first()
        .find('td')
        .eq(3)
        .should('contain', 'Small')

      cy.get('tbody tr')
        .last()
        .find('td')
        .eq(3)
        .should('contain', 'Big')
    })

    it('sorts by Number of employees in descending order', () => {
      cy.contains('th', 'Number of employees').click()
      cy.contains('th', 'Number of employees ↓').should('be.visible')
      cy.get('tbody tr')
        .first()
        .find('td')
        .eq(2)
        .should('contain', '2174')

      cy.get('tbody tr')
        .last()
        .find('td')
        .eq(2)
        .should('contain', '24')
    })

    it('sorts by Number of employees in ascending order', () => {
      cy.contains('th', 'Number of employees').click()
      cy.contains('th', 'Number of employees').click()
      cy.contains('th', 'Number of employees ↑').should('be.visible')
      cy.get('tbody tr')
        .first()
        .find('td')
        .eq(2)
        .should('contain', '24')

      cy.get('tbody tr')
        .last()
        .find('td')
        .eq(2)
        .should('contain', '2174')
    })
  })

  context('Theme', () => {
    it('changes to the dark mode then back to light mode', () => {
      cy.get('#theme-toggle-button').click()

      cy.getAllLocalStorage()
        .then((result) => {
          const theme = result[Cypress.config('baseUrl')].theme
          expect(theme).to.equal('dark')
        })

      cy.get('#theme-toggle-button').click()

      cy.getAllLocalStorage()
        .then((result) => {
          const theme = result[Cypress.config('baseUrl')].theme
          expect(theme).to.equal('light')
        })
    })
  })
})
