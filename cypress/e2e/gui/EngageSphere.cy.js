const options = {
  viewportHeight: 1240,
  viewportWidth: 1024
}

const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('EngageSphere Frontend', options, () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      { fixture: 'customers' }
    ).as('getCustomers')

    cy.visit('/')
    cy.wait('@getCustomers')
  })

  context('Filtering', () => {
    it('filters by All sizes', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Small`,
        { fixture: 'smallCustomers' }
      ).as('getSmallCustomers')
      // First, filter by a different size (e.g., Small)
      // So that when filtering by All, the `getCustomers` request happens again,
      // and the test can wait for it.
      cy.get('[data-testid="filter"]').select('Small')
      cy.wait('@getSmallCustomers')
      cy.get('[data-testid="filter"]').select('All')
      cy.wait('@getCustomers')

      cy.get('tbody tr').should('have.length', 5)
    })

    it('filters by Small size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Small`,
        { fixture: 'smallCustomers' }
      ).as('getSmallCustomers')

      cy.get('[data-testid="filter"]').select('Small')

      cy.wait('@getSmallCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Medium size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Medium`,
        { fixture: 'mediumCustomers' }
      ).as('getMediumCustomers')

      cy.get('[data-testid="filter"]').select('Medium')

      cy.wait('@getMediumCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Enterprise`,
        { fixture: 'enterpriseCustomers' }
      ).as('getEnterpriseCustomers')

      cy.get('[data-testid="filter"]').select('Enterprise')

      cy.wait('@getEnterpriseCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Large Enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Large%20Enterprise`,
        { fixture: 'largeEnterpriseCustomers'}
      ).as('getLargeEnterpriseCustomers')

      cy.get('[data-testid="filter"]').select('Large Enterprise')

      cy.wait('@getLargeEnterpriseCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Very Large Enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Very%20Large%20Enterprise`,
        { fixture: 'veryLargeEnterpriseCustomers'}
      ).as('getVeryLargeEnterpriseCustomers')

      cy.get('[data-testid="filter"]').select('Very Large Enterprise')

      cy.wait('@getVeryLargeEnterpriseCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })
  })

  context('Pagination', () => {
    it('persists the limit of items per page in the local storage when changing the limit', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=50**`,
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

    it('triggers the correct request when clicking the Next and Prev buttons', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1**`,
        { fixture: 'customers' }
      ).as('getCustomersFromPageOne')
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=2**`,
        { fixture: 'pageTwoCustomers' }
      ).as('getCustomersFromPageTwo')

      cy.contains('button', 'Next').click()

      cy.wait('@getCustomersFromPageTwo')

      cy.contains('button', 'Prev').click()

      cy.wait('@getCustomersFromPageOne')
    })
  })

  context('Customer details', () => {
    it('goes back to the customers list when clicking the "Back" button', () => {
      cy.get('button[aria-label^="View company:"]')
        .first()
        .click()

      cy.get('.customer-details').should('be.visible')
      cy.get('table').should('not.exist')

      cy.contains('button', 'Back').click()

      cy.get('table').should('be.visible')
    })
  })
})

describe('EngageSphere Frontend - empty state', options, () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/')
    cy.wait('@getEmptyCustomers')
  })

  it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
    cy.get('svg[alt="image of an empty box"]').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })

  it('disables the name text input field when there are no customers in the database', () => {
    cy.get('input[type="text"]').should('be.disabled')
  })
})

describe('EngageSphere Frontend - A11y', options, () => {
  context('With customers', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
      cy.get('[data-theme="light"]').should('exist')
    })

    context('Customers table', () => {
      it('finds no a11y issues in light mode', () => {
        cy.checkA11y()
      })

      it('finds no a11y issues in dark mode', () => {
        cy.get('#theme-toggle-button').click()

        cy.get('[data-theme="dark"]').should('exist')

        cy.checkA11y()
      })
    })

    context('Customer details and address', () => {
      beforeEach(() => {
        cy.get('button[aria-label^="View company:"]')
          .first()
          .click()
        cy.contains('button', 'Show address').click()
        cy.contains('h3', 'Address').should('be.visible')
      })

      it('finds no a11y issues in light mode', () => {
        cy.checkA11y()
      })

      it('finds no a11y issues in dark mode', () => {
        cy.get('#theme-toggle-button').click()

        cy.get('[data-theme="dark"]').should('exist')

        cy.checkA11y()
      })
    })
  })

  context('Without customers (empty state)', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}**`,
        { body: null }
      ).as('getEmptyCustomers')
      cy.visit('/')
      cy.wait('@getEmptyCustomers')
      cy.injectAxe()
      cy.get('[data-theme="light"]').should('exist')
    })

    it('finds no a11y issues in light mode', () => {
      cy.checkA11y()
    })

    it('finds no a11y issues in dark mode', () => {
      cy.get('#theme-toggle-button').click()

      cy.get('[data-theme="dark"]').should('exist')

      cy.checkA11y()
    })
  })
})

describe('EngageSphere Frontend - Loading fallback', options, () => {
  it('shows a Loading... fallback element before the initial customers\' fetch', () => {
    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      {
        delay: 1000,
        fixture: 'customers',
      }
    ).as('getDelayedCustomers')

    cy.visit('/')

    cy.contains('p', 'Loading...').should('be.visible')

    cy.wait('@getDelayedCustomers')

    cy.contains('p', 'Loading...').should('not.exist')
  })
})
