import Header from './index'

describe('<Header />', () => {
  beforeEach(() => {
    cy.mount(<Header />)
  })

  it('renders with heading and theme\'s toggle', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[class^="ThemeToggle_button"]').should('be.visible')
  })

  it('changes to the dark mode then back to light mode', () => {
    cy.get('[class^="ThemeToggle_button"]').click()

    cy.assertLocalStorageThemeIs('dark')

    cy.get('[class^="ThemeToggle_button"]').click()

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
