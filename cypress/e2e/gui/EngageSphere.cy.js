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

  context('Customers table', () => {
    it('shows a list of customers when there\'s data in the database', () => {
      cy.get('tbody tr').eq(0).find('td').eq(0).should('contain', '1')
      cy.get('tbody tr').eq(0)
        .should('contain', 'Jacobs, Bechtelar and Von')
        .and('contain', '2174')
        .and('contain', 'Big')
      cy.get('tbody tr').eq(1).find('td').eq(0).should('contain', '5')
      cy.get('tbody tr').eq(1)
        .should('contain', 'Runolfsson, Satterfield and Huel')
        .and('contain', '1015')
        .and('contain', 'Big')
      cy.get('tbody tr').eq(2).find('td').eq(0).should('contain', '2')
      cy.get('tbody tr').eq(2)
        .should('contain', 'Kilback - Kerluke')
        .and('contain', '226')
        .and('contain', 'Medium')
      cy.get('tbody tr').eq(3).find('td').eq(0).should('contain', '3')
      cy.get('tbody tr').eq(3)
        .should('contain', 'Parisian - Berge')
        .and('contain', '47')
        .and('contain', 'Small')
      cy.get('tbody tr').eq(4).find('td').eq(0).should('contain', '4')
      cy.get('tbody tr').eq(4)
        .should('contain', 'Wilderman, Marks and Funk')
        .and('contain', '24')
        .and('contain', 'Small')
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

  context('Filtering', () => {
    it('Filters by All sizes', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
        { fixture: 'smallCustomers' }
      )
      // First, filter by a different size (e.g., Small)
      // So that when filtering by All, the `getCustomers` request happens again,
      // and the test can wait for it.
      cy.get('[data-testid="filter"]').select('Small')
      cy.get('[data-testid="filter"]').select('All')

      cy.wait('@getCustomers')

      cy.get('tbody tr').should('have.length', 5)
    })

    it('Filters by Small size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
        { fixture: 'smallCustomers' }
      ).as('getSmallCustomers')

      cy.get('[data-testid="filter"]').select('Small')

      cy.wait('@getSmallCustomers')

      cy.get('tbody tr').should('have.length', 2)
    })

    it('Filters by Medium size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Medium`,
        { fixture: 'mediumCustomers' }
      ).as('getMediumCustomers')

      cy.get('[data-testid="filter"]').select('Medium')

      cy.wait('@getMediumCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('Filters by Big size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Big`,
        { fixture: 'bigCustomers' }
      ).as('getBigCustomers')

      cy.get('[data-testid="filter"]').select('Big')

      cy.wait('@getBigCustomers')

      cy.get('tbody tr').should('have.length', 2)
    })
  })

  context('Pagination', () => {
    it('changing the page limit is persisted in the local storage', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=50**`,
        { fixture: 'moreCustomers' }
      ).as('getMoreCustomers')

      cy.get('select[aria-label="Pagination limit"]')
        .select('50')

      cy.wait('@getMoreCustomers')

      cy.getAllLocalStorage()
        .then((result) => {
          const limit = result[Cypress.config('baseUrl')].paginationLimit
          expect(limit).to.equal('50')
        })

      cy.reload()

      cy.wait('@getMoreCustomers')

      cy.get('select[aria-label="Pagination limit"]')
        .should('have.value', 50)
    })
  })

  context('Customer details', () => {
    it('disables the text input field when in the customer details page', () => {
      cy.get('tbody tr')
        .first()
        .click()

      cy.get('input[type="text"]').should('be.disabled')
    })

    it('goes back to the customers list when clicking the "Back" button', () => {
      cy.get('tbody tr')
        .first()
        .click()

      cy.get('.customer-details').should('be.visible')
      cy.get('table').should('not.exist')

      cy.contains('button', 'Back').click()

      cy.get('table').should('be.visible')
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

describe('EngageSphere Frontend - empty state', {
  viewportHeight: 1240,
  viewportWidth: 1024
}, () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/')
    cy.wait('@getEmptyCustomers')
  })

  it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
    cy.get('svg').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })

  it('disables the text input field when there are no customers in the database', () => {
    cy.get('input[type="text"]').should('be.disabled')
  })
})

describe('EngageSphere Frontend - A11y', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  context('Customers table', () => {
    it('finds no a11y issues in light mode', () => {
      cy.checkA11y()
    })

    it('finds no a11y issues in dark mode', () => {
      cy.get('#theme-toggle-button').click()
      cy.checkA11y()
    })
  })

  context('Customer details', () => {
    beforeEach(() => {
      cy.get('tbody tr').first().click()
    })

    it('finds no a11y issues in light mode', () => {
      cy.checkA11y()
    })

    it('finds no a11y issues in dark mode', () => {
      cy.get('#theme-toggle-button').click()
      cy.checkA11y()
    })
  })
})
