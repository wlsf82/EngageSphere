import React from 'react'
import Input from '.'

describe('<Input />', () => {
  it('renders enabled', () => {
    cy.mount(<Input disabled={false} />)

    cy.get('input[placeholder="E.g., John Doe"]').should('be.enabled')
  })

  it('renders disabled', () => {
    cy.mount(<Input disabled={true} />)

    cy.get('input[placeholder="E.g., John Doe"]').should('be.disabled')
  })

  it('limits the input data to 40 characters', () => {
    cy.mount(<Input disabled={false} />)

    cy.get('input[placeholder="E.g., John Doe"]')
      .should('have.attr', 'maxlength', '40')
  })
})
