import Messenger from './Messenger'

describe('<Messenger />', () => {
  context('Light mode', () => {
    beforeEach(() => {
      cy.mount(
        <main>
          <Messenger />
        </main>
      )

      cy.injectAxe()
      cy.configureAxe({
        rules: [{
          id: 'page-has-heading-one',
          enabled: false
        }]
      })

      cy.get('.messenger-box').should('not.exist')
      cy.get('.messenger-button').should('be.visible')
    })

    it('opens and closes the messenger and finds no a11y issue', () => {
      cy.get('.messenger-button').click()

      cy.get('.messenger-box').should('be.visible')
      cy.checkA11y()

      cy.get('.close-button').click()

      cy.get('.messenger-box').should('not.exist')
      cy.get('.messenger-button').should('be.visible')
      cy.checkA11y()
    })

    it('makes sure all fields are mandatory', () => {
      cy.get('.messenger-button').click()

      cy.get('.messenger-form input[type="text"]').should('have.attr', 'required')
      cy.get('.messenger-form input[type="email"]').should('have.attr', 'required')
      cy.get('.messenger-form textarea').should('have.attr', 'required')
    })

    it('shows and hides a success message when successfully submitting the form', () => {
      const now = new Date()
      cy.clock(now)

      cy.get('.messenger-button').click()

      cy.get('.messenger-form input[type="text"]').type('John')
      cy.get('.messenger-form input[type="email"]').type('john-doe@example.com')
      cy.get('.messenger-form textarea').type('The customer with ID 5 has not contact info.')
      cy.contains('button', 'Send').click()

      cy.contains('.success', 'Your message has been sent.').should('be.visible')

      cy.tick(3000)

      cy.contains('.success', 'Your message has been sent.').should('not.exist')
    })
  })

  context('Dark mode', () => {
    beforeEach(() => {
      cy.mount(
        <main data-theme="dark">
          <Messenger />
        </main>
      )

      cy.injectAxe()
      cy.configureAxe({
        rules: [{
          id: 'page-has-heading-one',
          enabled: false
        }]
      })

      cy.get('.messenger-box').should('not.exist')
      cy.get('.messenger-button').should('be.visible')
    })

    it('finds on a11y issues with the bubble button', () => {
      cy.checkA11y()
    })

    it('successfully submits the form and finds no a11y issue', () => {
      cy.get('.messenger-button').click()

      cy.get('.messenger-form input[type="text"]').type('John')
      cy.get('.messenger-form input[type="email"]').type('john-doe@example.com')
      cy.get('.messenger-form textarea').type('The customer with ID 5 has not contact info.')

      cy.checkA11y()

      cy.contains('button', 'Send').click()

      cy.contains('.success', 'Your message has been sent.').should('be.visible')

      cy.checkA11y()
    })
  })
})
