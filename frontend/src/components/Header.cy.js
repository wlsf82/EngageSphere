import React from 'react'
import Header from './Header'

describe('<Header />', () => {
  beforeEach(() => {
    cy.mount(<Header />)
  })

  it('renders with heading and theme\'s toggle', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[aria-label="theme-toggle-button"]').should('be.visible')
  })

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