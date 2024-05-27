import React from 'react'
import Input from './Input'

describe('<Input />', () => {
  it('renders disabled', () => {
    cy.mount(<Input disabled={true} onChange={cy.stub()} />)

    cy.get('input[placeholder="Enter your name"]').should('be.disabled')
  })
})
