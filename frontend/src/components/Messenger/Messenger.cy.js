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

      cy.getByClassThatStartsWith('Messenger_box').should('not.exist')
      cy.getByClassThatStartsWith('Messenger_openCloseButton').should('be.visible')

      cy.getByClassThatStartsWith('Messenger_openCloseButton').click()
    })

    it('opens and closes the messenger and finds no a11y issue', () => {
      cy.getByClassThatStartsWith('Messenger_box').should('be.visible')
      cy.checkA11y()

      cy.getByClassThatStartsWith('Messenger_openCloseButton').click()

      cy.getByClassThatStartsWith('Messenger_box').should('not.exist')
      cy.getByClassThatStartsWith('Messenger_openCloseButton').should('be.visible')
      cy.checkA11y()
    })

    it('makes sure all fields are mandatory and the first one is focused', () => {
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .should('be.focused')
        .and('have.attr', 'required')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .should('have.attr', 'required')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .should('have.attr', 'required')
    })

    it('shows and hides a success message when successfully submitting the form', () => {
      const now = new Date()
      cy.clock(now)

      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .type('John')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .type('john-doe@example.com')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .type('The customer with ID 5 has not contact info.')
      cy.contains('button', 'Send').click()

      cy.getByClassThatStartsWith('Messenger_success')
        .should('be.visible')
        .and('contain', 'Your message has been sent.')

      cy.tick(3000)

      cy.getByClassThatStartsWith('Messenger_success').should('not.exist')
    })

    it('clears all form fields when filling them, closing the messenger, and opening it again', () => {
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .type('Joe')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .type('Joe@example.com')
        cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .type('The customer with ID 5 has not contact info.')

      cy.getByClassThatStartsWith('Messenger_openCloseButton').click()
      cy.getByClassThatStartsWith('Messenger_openCloseButton').click()

      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .should('have.value', '')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .should('have.value', '')
        cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .should('have.value', '')
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

      cy.getByClassThatStartsWith('Messenger_box').should('not.exist')
      cy.getByClassThatStartsWith('Messenger_openCloseButton').should('be.visible')
    })

    it('finds on a11y issues with the bubble button', () => {
      cy.checkA11y()
    })

    it('successfully submits the form and finds no a11y issue', () => {
      cy.getByClassThatStartsWith('Messenger_openCloseButton').click()

      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .type('John')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .type('john-doe@example.com')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .type('The customer with ID 5 has not contact info.')

      cy.checkA11y()

      cy.contains('button', 'Send').click()

      cy.getByClassThatStartsWith('Messenger_success')
        .should('be.visible')
        .and('contain', 'Your message has been sent.')

      cy.checkA11y()
    })
  })
})
