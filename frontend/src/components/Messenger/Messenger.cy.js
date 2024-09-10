import Messenger from '.'

const options = {
  viewportHeight: 600,
  viewportWidth: 400
}

describe('<Messenger />', options, () => {
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

      cy.getByClassStartsWith('Messenger_box').should('not.exist')
      cy.getByClassStartsWith('Messenger_openCloseButton').should('be.visible')
    })

    it('opens and closes the messenger and finds no a11y issue', () => {
      cy.getByClassStartsWith('Messenger_openCloseButton').click()

      cy.getByClassStartsWith('Messenger_box').should('be.visible')
      cy.checkA11y()

      cy.getByClassStartsWith('Messenger_openCloseButton').click()

      cy.getByClassStartsWith('Messenger_box').should('not.exist')
      cy.getByClassStartsWith('Messenger_openCloseButton').should('be.visible')
      cy.checkA11y()
    })

    it('makes sure all fields are mandatory and the first one is focused', () => {
      cy.getByClassStartsWith('Messenger_openCloseButton').click()

      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="text"]')
        .should('be.focused')
        .and('have.attr', 'required')
      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="email"]')
        .should('have.attr', 'required')
      cy.getByClassStartsWith('Messenger_form')
        .find('form textarea')
        .should('have.attr', 'required')
    })

    it('shows and hides a success message when successfully submitting the form', () => {
      const now = new Date()
      cy.clock(now)

      cy.getByClassStartsWith('Messenger_openCloseButton').click()

      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="text"]')
        .type('John')
      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="email"]')
        .type('john-doe@example.com')
      cy.getByClassStartsWith('Messenger_form')
        .find('form textarea')
        .type('The customer with ID 5 has not contact info.')
      cy.contains('button', 'Send').click()

      cy.contains(
        '[class^="Messenger_success"]',
        'Your message has been sent.'
      ).should('be.visible')

      cy.tick(3000)

      cy.contains(
        '[class^="Messenger_success"]',
        'Your message has been sent.'
      ).should('not.exist')
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

      cy.getByClassStartsWith('Messenger_box').should('not.exist')
      cy.getByClassStartsWith('Messenger_openCloseButton').should('be.visible')
    })

    it('finds on a11y issues with the bubble button', () => {
      cy.checkA11y()
    })

    it('successfully submits the form and finds no a11y issue', () => {
      cy.getByClassStartsWith('Messenger_openCloseButton').click()

      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="text"]')
        .type('John')
      cy.getByClassStartsWith('Messenger_form')
        .find('form input[type="email"]')
        .type('john-doe@example.com')
      cy.getByClassStartsWith('Messenger_form')
        .find('form textarea')
        .type('The customer with ID 5 has not contact info.')

      cy.checkA11y()

      cy.contains('button', 'Send').click()

      cy.contains(
        '[class^="Messenger_success"]',
        'Your message has been sent.'
      ).should('be.visible')

      cy.checkA11y()
    })
  })
})
