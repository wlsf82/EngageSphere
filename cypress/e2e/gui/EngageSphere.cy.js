const options = {
  viewportHeight: 1240,
  viewportWidth: 1024
}

describe('EngageSphere Frontend', options, () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { fixture: 'customers' }
    ).as('getCustomers')

    cy.visit('/customers')
    cy.wait('@getCustomers')
  })

  context('Filtering', () => {
    it('filters by All sizes', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
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
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
        { fixture: 'smallCustomers' }
      ).as('getSmallCustomers')

      cy.get('[data-testid="filter"]').select('Small')

      cy.wait('@getSmallCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Medium size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Medium`,
        { fixture: 'mediumCustomers' }
      ).as('getMediumCustomers')

      cy.get('[data-testid="filter"]').select('Medium')

      cy.wait('@getMediumCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Enterprise size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Enterprise`,
        { fixture: 'enterpriseCustomers' }
      ).as('getEnterpriseCustomers')

      cy.get('[data-testid="filter"]').select('Enterprise')

      cy.wait('@getEnterpriseCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Large Enterprise size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Large%20Enterprise`,
        { fixture: 'largeEnterpriseCustomers'}
      ).as('getLargeEnterpriseCustomers')

      cy.get('[data-testid="filter"]').select('Large Enterprise')

      cy.wait('@getLargeEnterpriseCustomers')

      cy.get('tbody tr').should('have.length', 1)
    })

    it('filters by Very Large Enterprise size', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Very%20Large%20Enterprise`,
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
    beforeEach(() => {
      cy.get('tbody tr')
        .first()
        .click()
    })

    it('changes the URL path to /customers/n when accessing the customer details', () => {
      cy.location('pathname').should('be.equal', '/customers/5')
    })

    it('goes back to the customers list when clicking the "Back" button', () => {
      cy.get('.customer-details').should('be.visible')
      cy.get('table').should('not.exist')

      cy.contains('button', 'Back').click()

      cy.location('pathname').should('be.equal', '/customers')
      cy.get('table').should('be.visible')
    })
  })
})

describe('Customer details - access via URL', () => {
  it('visits the customer details directly via the URL', () => {
    cy.visit('/customers/1')

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.location('pathname').should('be.equal', '/customers/1')
  })

  context('Customer not found', () => {
    beforeEach(() => {
      cy.visit('/customers/1111') // Supposing customer 1111 does not exist in the database
    })

    it('shows a 404 - customer not found when visiting an non existing customer', () => {
      cy.contains('h2', '404').should('be.visible')
      cy.contains('p', 'Customer not found.').should('be.visible')
      cy.contains('button', 'Back').should('be.visible')
      cy.location('pathname').should('be.equal', '/customers/1111')
    })

    it('goes back to the customers list when clicking the "Back" button at the 404 view', () => {
      cy.get('.not-found').should('be.visible')
      cy.get('table').should('not.exist')

      cy.contains('button', 'Back').click()

      cy.location('pathname').should('be.equal', '/customers')
      cy.get('table').should('be.visible')
    })
  })
})

describe('EngageSphere Frontend - empty state', options, () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/customers')
    cy.wait('@getEmptyCustomers')
  })

  it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
    cy.get('svg[alt="image of an empty box"]').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })
})

describe('EngageSphere Frontend - A11y', options, () => {
  context('With customers', () => {
    beforeEach(() => {
      cy.visit('/customers')
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

    context('Customer details', () => {
      beforeEach(() => {
        cy.get('tbody tr').first().click()
      })

      it('finds no a11y issues in light mode', () => {
        cy.checkA11y()
      })

      it('finds no a11y issues in dark mode', () => {
        cy.get('#theme-toggle-button').click()

        cy.get('[data-theme="dark"]').should('exist')

        cy.checkA11y()
      })

      context('Show address', () => {
        it('finds no a11y issues in light mode', () => {
          cy.contains('button', 'Show address').click()

          cy.checkA11y()
        })

        it('finds no a11y issues in dark mode', () => {
          cy.get('#theme-toggle-button').click()

          cy.get('[data-theme="dark"]').should('exist')

          cy.contains('button', 'Show address').click()

          cy.checkA11y()
        })
      })
    })
  })

  context('Without customers (empty state)', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers**`,
        { body: null }
      ).as('getEmptyCustomers')
      cy.visit('/customers')
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

describe('EnageSphere Frontend - Loading fallback', options, () => {
  it('shows a Loading... fallback element before the initial customers\' fetch', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      {
        delay: 1000,
        fixture: 'customers',
      }
    ).as('getDelayedCustomers')

    cy.visit('/customers')

    cy.contains('p', 'Loading...').should('be.visible')

    cy.wait('@getDelayedCustomers')

    cy.contains('p', 'Loading...').should('not.exist')
  })
})
