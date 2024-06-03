import React from 'react'
import Input from './Input'

describe('<Input />', () => {
  it('renders enabled', () => {
    cy.mount(<Input disabled={false} />)

    cy.get('input[placeholder="Enter your name"]').should('be.enabled')
  })

  it('renders disabled', () => {
    cy.mount(<Input disabled={true} />)

    cy.get('input[placeholder="Enter your name"]').should('be.disabled')
  })
})
