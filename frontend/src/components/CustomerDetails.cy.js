import CustomerDetails from './CustomerDetails'

describe('<CustomerDetails />', () => {
  let backButtonClickHandler

  beforeEach(() => {
    backButtonClickHandler = cy.stub().as('backBtnClickHandler')
  })

  it('renders with contact details', () => {
    const customer = {
      name: 'Caca Cala',
      employees: 1000,
      size: 'Medium',
      contactInfo: {
        name: 'Joe',
        email: 'joe@cacacala.com'
      }
    }
    cy.mount(<CustomerDetails customer={customer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', 'Company name: Caca Cala').should('be.visible')
    cy.contains('p', 'Number of employees: 1000').should('be.visible')
    cy.contains('p', 'Size: Medium').should('be.visible')

    cy.contains('p', 'Contact name: Joe').should('be.visible')
    cy.contains('p', 'Contact email: joe@cacacala.com').should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })

  it('renders without contact details', () => {
    const customer = {
      name: 'Cocoa Cola',
      employees: 100,
      size: 'Small',
      contactInfo: null
    }
    cy.mount(<CustomerDetails customer={customer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', 'Company name: Cocoa Cola').should('be.visible')
    cy.contains('p', 'Number of employees: 100').should('be.visible')
    cy.contains('p', 'Size: Small').should('be.visible')

    cy.contains('p', 'No contact info available').should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })
})
