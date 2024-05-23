import CustomerDetails from './CustomerDetails'

// Import a complete customer from a fixture
const completeCustomer = require('../../../cypress/fixtures/customers.json').customers[1]

describe('<CustomerDetails />', () => {
  let backButtonClickHandler

  beforeEach(() => {
    backButtonClickHandler = cy.stub().as('backBtnClickHandler')
  })

  it('renders with contact details', () => {
    cy.mount(<CustomerDetails customer={completeCustomer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', `Company name: ${completeCustomer.name}`).should('be.visible')
    cy.contains('p', `Number of employees: ${completeCustomer.employees}`).should('be.visible')
    cy.contains('p', `Size: ${completeCustomer.size}`).should('be.visible')

    cy.contains('p', `Contact name: ${completeCustomer.contactInfo.name}`).should('be.visible')
    cy.contains('p', `Contact email: ${completeCustomer.contactInfo.email}`).should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })

  it('renders a fallback paragraph (\'No contact info available\') when contact details are not available', () => {
    const customer = {
      ...completeCustomer,
      contactInfo: null,
    }
    cy.mount(<CustomerDetails customer={customer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', `Company name: ${completeCustomer.name}`).should('be.visible')
    cy.contains('p', `Number of employees: ${completeCustomer.employees}`).should('be.visible')
    cy.contains('p', `Size: ${completeCustomer.size}`).should('be.visible')

    cy.contains('p', 'No contact info available').should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })

  it('shows and hides customer address', () => {
    cy.mount(<CustomerDetails customer={completeCustomer} onClick={backButtonClickHandler} />)

    cy.contains('button', 'Show address').click()

    cy.contains('h3', 'Address').should('be.visible')
    cy.contains('p', `Street: ${completeCustomer.address.street}`).should('be.visible')
    cy.contains('p', `City: ${completeCustomer.address.city}`).should('be.visible')
    cy.contains('p', `State: ${completeCustomer.address.state}`).should('be.visible')
    cy.contains('p', `Zip code: ${completeCustomer.address.zipCode}`).should('be.visible')
    cy.contains('p', `Country: ${completeCustomer.address.country}`).should('be.visible')

    cy.contains('button', 'Hide address').click()

    cy.get('.address-info').should('not.exist')
  })

  it('renders a fallback paragraph (\'No address available\') when address is not available', () => {
    const customerWithoutAddress = {
      ...completeCustomer,
      address: null,
    }
    cy.mount(<CustomerDetails customer={customerWithoutAddress} onClick={backButtonClickHandler} />)

    cy.contains('button', 'Show address').click()

    cy.contains('p', 'No address available').should('be.visible')
  })
})
