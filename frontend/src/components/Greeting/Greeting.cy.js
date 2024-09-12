import React from 'react'
import Greeting from '.'

describe('<Greeting />', () => {
  beforeEach(() => {
    const now = new Date(2024, 3, 15) // month is 0-indexed
    cy.clock(now)
  })

  it('renders "Hi there" when no name is provided', () => {
    cy.mount(<Greeting />)

    cy.contains('h2', 'Hi there! It is Monday, April 15, 2024')
      .should('be.visible')
  })

  it('renders "Hi Joe" when name is provided', () => {
    cy.mount(<Greeting name='Joe' />)

    cy.contains('h2', 'Hi Joe! It is Monday, April 15, 2024')
      .should('be.visible')
  })
})
