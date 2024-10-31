import capitalizeFirstLetter from '../../support/utils'

const options = {
  viewportHeight: 1240,
  viewportWidth: 1024
}

const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('EngageSphere Frontend', options, () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')

    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      { fixture: 'customers' }
    ).as('getCustomers')

    cy.visit('/')
    cy.wait('@getCustomers')
  })

  context('Filtering', () => {
    context('By size', () => {
      it('filters by All sizes', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_API_URL}?page=1&limit=10&size=Small&industry=All`,
          { fixture: 'smallCustomers' }
        ).as('getSmallCustomers')
        // First, filter by a different size (e.g., Small)
        // So that when filtering by All, the `getCustomers` request happens again,
        // and the test can wait for it.
        cy.get('[data-testid="size-filter"]').select('Small')
        cy.wait('@getSmallCustomers')
        cy.get('[data-testid="size-filter"]').select('All')
        cy.wait('@getCustomers')

        cy.get('tbody tr').should('have.length', 5)
      })

      const sizes = {
        small: 'Small',
        medium: 'Medium',
        enterprise: 'Enterprise',
        largeEnterprise: 'Large Enterprise',
        veryLargeEnterprise: 'Very Large Enterprise',
      }

      Object.entries(sizes).forEach(([sizeKey, sizeValue]) => {
        it(`filters by ${sizeValue}`, () => {
          /**
           * encodeURIComponent is a JavaScript function that encodes special characters
           * in a string so they can be safely included in a URL.
           * This includes characters like spaces, punctuation,
           * and others that might otherwise break a URL or alter its meaning.
           *
           * For example:
           *
           * If sizeValue is equal to 'Large Enterprise', then:
           *
           * const encodedSize = encodeURIComponent('Large Enterprise')
           *
           * would become 'Large%20Enterprise'
           */
          const encodedSize = encodeURIComponent(sizeValue)

          cy.intercept(
            'GET',
            `${CUSTOMERS_API_URL}**&size=${encodedSize}**`,
            { fixture: `${sizeKey}Customers` }
          ).as(`get${capitalizeFirstLetter(sizeKey)}Customers`)

          cy.get('[data-testid="size-filter"]').select(sizeValue)
          cy.wait(`@get${capitalizeFirstLetter(sizeKey)}Customers`)
          cy.get('tbody tr').should('have.length', 1)
        })
      })
    })

    context('By industry', () => {
      it('filters by All industries', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_API_URL}?page=1&limit=10&size=All&industry=Logistics`,
          { fixture: 'logisticsCustomers' }
        ).as('getLogisticsCustomers')

        // First, filter by a different industry (e.g., Logistics)
        // So that when filtering by All, the `getCustomers` request happens again,
        // and the test can wait for it.
        cy.get('[data-testid="industry-filter"]').select('Logistics')
        cy.wait('@getLogisticsCustomers')

        cy.get('[data-testid="industry-filter"]').select('All')
        cy.wait('@getCustomers')

        cy.get('tbody tr').should('have.length', 5)
      })

      const industries = {
        logistics: 'Logistics',
        retail: 'Retail',
        technology: 'Technology',
        hr: 'HR',
        finance: 'Finance',
      }

      Object.entries(industries).forEach(([industryKey, industryValue]) => {
        it(`filters by ${industryValue}`, () => {
          cy.intercept(
            'GET',
            `${CUSTOMERS_API_URL}**&industry=${industryValue}**`,
            { fixture: `${industryKey}Customers` }
          ).as(`get${capitalizeFirstLetter(industryKey)}Customers`)

          cy.get('[data-testid="industry-filter"]').select(industryValue)
          cy.wait(`@get${capitalizeFirstLetter(industryKey)}Customers`)
          cy.get('tbody tr').should('have.length', 1)
        })
      })
    })

    it('keeps the filters when coming back from the customer details view', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Enterprise&industry=All`,
        { fixture: 'enterpriseCustomers' }
      ).as('getEnterpriseCustomers')

      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Enterprise&industry=Logistics`,
        { fixture: 'enterpriseCustomers' }
      ).as('getEnterpriseLogisticsCustomers')

      cy.get('[data-testid="size-filter"]').select('Enterprise')
      cy.wait('@getEnterpriseCustomers')

      cy.get('[data-testid="industry-filter"]').select('Logistics')
      cy.wait('@getEnterpriseLogisticsCustomers')

      cy.contains('button', 'View').click()
      cy.contains('button', 'Back').click()

      cy.get('[data-testid="size-filter"]').should('have.value', 'Enterprise')
      cy.get('[data-testid="industry-filter"]').should('have.value', 'Logistics')
    })

    it('re-enables the input field when coming back from an empty state filter to a non-empty one', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Enterprise&industry=All`,
        { fixture: 'enterpriseCustomers' }
      ).as('getEnterpriseCustomers')

      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?page=1&limit=10&size=Enterprise&industry=Retail`,
        {
          body: {
            customers: [],
            pageInfo: {
              currentPage: 1,
              totalPages: 1,
              totalCustomers: 1
            }
          }
        }
      ).as('getEmptyEnterpriseRetailCustomers')

      cy.get('[data-testid="size-filter"]').select('Enterprise')
      cy.wait('@getEnterpriseCustomers')

      cy.get('[data-testid="industry-filter"]').select('Retail')
      cy.wait('@getEmptyEnterpriseRetailCustomers')

      cy.get('input[placeholder="E.g., John Doe"]').should('be.disabled')

      cy.get('[data-testid="industry-filter"]').select('All')
      cy.wait('@getEnterpriseCustomers')

      cy.get('input[placeholder="E.g., John Doe"]').should('be.enabled')
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
        .then(localStorage => {
          const { paginationLimit } = localStorage[Cypress.config('baseUrl')]
          expect(paginationLimit).to.equal('50')
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
      cy.contains('button', 'View').click()

      cy.getByClassThatStartsWith('CustomerDetails_container').should('be.visible')
      cy.get('table').should('not.exist')

      cy.contains('button', 'Back').click()

      cy.get('table').should('be.visible')
    })
  })
})

describe('EngageSphere Frontend - empty state', options, () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')

    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/')
    cy.wait('@getEmptyCustomers')
  })

  it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
    cy.get('svg[title="image of an empty box"]').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })

  it('disables the name text input field when there are no customers in the database', () => {
    cy.get('input[placeholder="E.g., John Doe"]').should('be.disabled')
  })
})

describe('EngageSphere Frontend - A11y', options, () => {
  context('With customers', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted')
      cy.visit('/')
      cy.injectAxe()
      cy.get('[data-theme="light"]').should('exist')
    })

    context('Customers table', () => {
      it('finds no a11y issues in light mode', () => {
        cy.checkA11y()
      })

      it('finds no a11y issues in dark mode', () => {
        cy.getByClassThatStartsWith('ThemeToggle_button').click()

        cy.get('[data-theme="dark"]').should('exist')

        cy.checkA11y()
      })
    })

    context('Customer details and address', () => {
      beforeEach(() => {
        cy.contains('button', 'View').click()
        cy.contains('button', 'Show address').click()
        cy.contains('h3', 'Address').should('be.visible')
      })

      it('finds no a11y issues in light mode', () => {
        cy.checkA11y()
      })

      it('finds no a11y issues in dark mode', () => {
        cy.getByClassThatStartsWith('ThemeToggle_button').click()

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
      cy.getByClassThatStartsWith('ThemeToggle_button').click()

      cy.get('[data-theme="dark"]').should('exist')

      cy.checkA11y()
    })
  })
})

describe('EngageSphere Frontend - Loading fallback', options, () => {
  it('shows a Loading... fallback element before the initial customers\' fetch', () => {
    cy.setCookie('cookieConsent', 'accepted')
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

describe('Cookie consent', () => {
  beforeEach(() => {
    cy.clearCookie('cookieConsent')

    cy.intercept(
      'GET',
      `${CUSTOMERS_API_URL}**`,
      { fixture: 'customers' }
    ).as('getCustomers')

    cy.visit('/')
    cy.wait('@getCustomers')
  })

  it('accepts the cookies', () => {
    cy.contains('button', 'Accept').click()

    cy.getCookie('cookieConsent').should('have.property', 'value', 'accepted')

    cy.getByClassThatStartsWith('CookieConsent_banner').should('not.exist')
  })

  it('declines the cookies', () => {
    cy.contains('button', 'Decline').click()

    cy.getCookie('cookieConsent').should('have.property', 'value', 'declined')

    cy.getByClassThatStartsWith('CookieConsent_banner').should('not.exist')
  })
})
