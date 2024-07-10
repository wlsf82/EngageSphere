import React from 'react'
import Input from './Input'

describe('<Input />', () => {
  it('renders enabled', () => {
    cy.mount(<Input disabled={false} />)

    cy.get('input[placeholder="E.g., John Doe"]').should('be.enabled')
  })

  it('renders disabled', () => {
    cy.mount(<Input disabled={true} />)

    cy.get('input[placeholder="E.g., John Doe"]').should('be.disabled')
  })
})
