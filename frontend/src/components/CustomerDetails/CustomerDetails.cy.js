import CustomerDetails from '.'

// Import a complete customer from a fixture
// where a complete customer means it has
// ID, name, employees, size, contact info, and address
const completeCustomer = require('../../../../cypress/fixtures/customers.json').customers[1]

describe('<CustomerDetails />', () => {
  let backButtonClickHandler

  beforeEach(() => {
    backButtonClickHandler = cy.stub()
  })

  it('renders with contact details', () => {
    const { contactInfo } = completeCustomer

    cy.mount(<CustomerDetails customer={completeCustomer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', `Company ID: ${completeCustomer.id}`).should('be.visible')
    cy.contains('p', `Company name: ${completeCustomer.name}`).should('be.visible')
    cy.contains('p', `Number of employees: ${completeCustomer.employees}`).should('be.visible')
    cy.contains('p', `Size: ${completeCustomer.size}`).should('be.visible')
    cy.contains('p', `Industry: ${completeCustomer.industry}`).should('be.visible')

    cy.contains('p', `Contact name: ${contactInfo.name}`).should('be.visible')
    cy.contains('p', `Contact email: ${contactInfo.email}`).should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })

  it('renders a fallback paragraph (\'No contact info available\') when contact details are not available', () => {
    const customerWithoutContactInfo = {
      ...completeCustomer,
      contactInfo: null,
    }
    cy.mount(<CustomerDetails customer={customerWithoutContactInfo} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', `Company ID: ${completeCustomer.id}`).should('be.visible')
    cy.contains('p', `Company name: ${completeCustomer.name}`).should('be.visible')
    cy.contains('p', `Number of employees: ${completeCustomer.employees}`).should('be.visible')
    cy.contains('p', `Size: ${completeCustomer.size}`).should('be.visible')

    cy.contains('p', 'No contact info available').should('be.visible')

    cy.contains('button', 'Back').should('be.visible')
  })

  it('shows and hides customer address', () => {
    const { address } = completeCustomer

    cy.mount(<CustomerDetails customer={completeCustomer} onClick={backButtonClickHandler} />)

    cy.contains('button', 'Show address').click()

    cy.contains('h3', 'Address').should('be.visible')
    cy.contains('p', `Street: ${address.street}`).should('be.visible')
    cy.contains('p', `City: ${address.city}`).should('be.visible')
    cy.contains('p', `State: ${address.state}`).should('be.visible')
    cy.contains('p', `Zip code: ${address.zipCode}`).should('be.visible')
    cy.contains('p', `Country: ${address.country}`).should('be.visible')

    cy.contains('button', 'Hide address').click()

    cy.contains('button', 'Show address').should('be.visible')
    cy.contains('h3', 'Address').should('not.exist')
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
