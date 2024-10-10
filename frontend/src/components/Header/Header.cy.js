import Header from './index'

describe('<Header />', () => {
  beforeEach(() => {
    cy.mount(<Header />)
  })

  it('renders with heading, theme\'s toggle, and a text input field', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.getByClassThatStartsWith('ThemeToggle_button').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
  })

  it('changes to the dark mode then back to light mode', () => {
    cy.getByClassThatStartsWith('ThemeToggle_button').click()

    cy.assertLocalStorageThemeIs('dark')

    cy.getByClassThatStartsWith('ThemeToggle_button').click()

    cy.assertLocalStorageThemeIs('light')
  })
})

Cypress.Commands.add('assertLocalStorageThemeIs', (expectedTheme) => {
  cy.getAllLocalStorage()
    .then((result) => {
      const definedTheme = result[Cypress.config('baseUrl')].theme
      expect(definedTheme).to.equal(expectedTheme)
    })
})
