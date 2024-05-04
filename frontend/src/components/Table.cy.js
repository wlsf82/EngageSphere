import React from 'react'
import Table from './Table'

const customers = require('../../../cypress/fixtures/customers.json').customers

const options = {
  viewportHeight: 1240,
  viewportWidth: 1024
}

describe('<Table />', options, () => {
  beforeEach(() => {
    cy.mount(<Table customers={customers} customerClickHandler={cy.stub()} />)
  })

  it('shows a list of customers when there\'s data in the database', () => {
    cy.get('tbody tr').eq(0).find('td').eq(0).should('contain', '5')
    cy.get('tbody tr').eq(0)
      .should('contain', 'Runolfsson, Satterfield and Huel')
      .and('contain', '51015')
      .and('contain', 'Very Large Enterprise')
    cy.get('tbody tr').eq(1).find('td').eq(0).should('contain', '4')
    cy.get('tbody tr').eq(1)
      .should('contain', 'Wilderman, Marks and Funk')
      .and('contain', '24000')
      .and('contain', 'Enterprise')
    cy.get('tbody tr').eq(2).find('td').eq(0).should('contain', '1')
    cy.get('tbody tr').eq(2)
      .should('contain', 'Jacobs, Bechtelar and Von')
      .and('contain', '2174')
      .and('contain', 'Enterprise')
    cy.get('tbody tr').eq(3).find('td').eq(0).should('contain', '2')
    cy.get('tbody tr').eq(3)
      .should('contain', 'Kilback - Kerluke')
      .and('contain', '226')
      .and('contain', 'Medium')
    cy.get('tbody tr').eq(4).find('td').eq(0).should('contain', '3')
    cy.get('tbody tr').eq(4)
      .should('contain', 'Parisian - Berge')
      .and('contain', '47')
      .and('contain', 'Small')
  })

  it('sorts by Size in descending order by default', () => {
    cy.contains('th', 'Size ↓').should('be.visible')
    cy.get('tbody tr')
      .first()
      .find('td')
      .eq(3)
      .should('contain', 'Very Large Enterprise')

    cy.get('tbody tr')
      .last()
      .find('td')
      .eq(3)
      .should('contain', 'Small')
  })

  it('sorts by Size in ascending order', () => {
    cy.contains('th', 'Size').click()
    cy.contains('th', 'Size ↑').should('be.visible')
    cy.get('tbody tr')
      .first()
      .find('td')
      .eq(3)
      .should('contain', 'Small')

    cy.get('tbody tr')
      .last()
      .find('td')
      .eq(3)
      .should('contain', 'Very Large Enterprise')
  })

  it('sorts by Number of employees in descending order', () => {
    cy.contains('th', 'Number of employees').click()
    cy.contains('th', 'Number of employees ↓').should('be.visible')
    cy.get('tbody tr')
      .first()
      .find('td')
      .eq(2)
      .should('contain', '51015')

    cy.get('tbody tr')
      .last()
      .find('td')
      .eq(2)
      .should('contain', '47')
  })

  it('sorts by Number of employees in ascending order', () => {
    cy.contains('th', 'Number of employees').click()
    cy.contains('th', 'Number of employees').click()
    cy.contains('th', 'Number of employees ↑').should('be.visible')
    cy.get('tbody tr')
      .first()
      .find('td')
      .eq(2)
      .should('contain', '47')

    cy.get('tbody tr')
      .last()
      .find('td')
      .eq(2)
      .should('contain', '51015')
  })
})
