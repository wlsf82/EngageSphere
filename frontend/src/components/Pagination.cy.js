import React from 'react'
import Pagination from './Pagination'

describe('<Pagination />', () => {
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      onClickPrev: cy.stub().as('onClickPrevHandler'),
      onClickNext: cy.stub().as('onClickNextHandler'),
      onChange: cy.stub().as('onChangeHandler'),
    }
  })

  it('renders in the middle page', () => {
    const props = {
      currentPage: 2,
      paginationInfo: {
        totalPages: 3,
        limit: 5
      },
      ...defaultProps,
    }

    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Prev')
      .should('be.enabled')
      .and('be.visible')
    cy.contains('button', 'Next')
      .should('be.enabled')
      .and('be.visible')
    cy.contains('span', 'Page 2 of 3')
      .should('be.visible')
    cy.get('select').should('have.value', 5)
  })

  it('renders in the first of two pages', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 2,
        limit: 5
      },
      ...defaultProps,
    }

    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Prev')
      .should('be.disabled')
      .and('be.visible')
    cy.contains('button', 'Next')
      .should('be.enabled')
      .and('be.visible')
    cy.contains('span', 'Page 1 of 2')
      .should('be.visible')
    cy.get('select').should('have.value', 5)
  })

  it('renders in the last of two pages', () => {
    const props = {
      currentPage: 2,
      paginationInfo: {
        totalPages: 2,
        limit: 5
      },
      ...defaultProps,
    }

    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Prev')
      .should('be.enabled')
      .and('be.visible')
    cy.contains('button', 'Next')
      .should('be.disabled')
      .and('be.visible')
    cy.contains('span', 'Page 2 of 2')
      .should('be.visible')
    cy.get('select').should('have.value', 5)
  })

  it('renders with a page limit of 50', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 10,
        limit: 50
      },
      ...defaultProps,
    }

    cy.mount(<Pagination {...props} />)
    
    cy.get('select').should('have.value', 50)
  })
})