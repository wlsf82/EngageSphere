import React from 'react'
import Input from './Input'

const customer = require('../../../cypress/fixtures/customers.json').customers[0]

describe('<Input />', () => {
  it('disables the text input field when in the customer details page', () => {
    cy.mount(<Input customer={customer} />)

    cy.get('input[placeholder="Enter your name"]').should('be.disabled')
  })

  it('disables the text input field when there are no customers in the database', () => {
    cy.mount(<Input customers={[]} />)

    cy.get('input[placeholder="Enter your name"]').should('be.disabled')
  })
})
