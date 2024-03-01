import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('renders with the right text and links', () => {
    cy.mount(<Footer />)

    cy.contains('p', 'Copyright 2024 - Talking About Testing')
      .should('be.visible')
    cy.contains('a', 'Udemy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
  })
})
