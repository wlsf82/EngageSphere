import CustomerDetails from './CustomerDetails'

describe('<CustomerDetails />', () => {
  let backButtonClickHandler

  beforeEach(() => {
    backButtonClickHandler = cy.stub().as('backBtnClickHandler')
  })

  const completeCustomer = {
    name: 'Caca Cala',
    employees: 1000,
    size: 'Medium',
    contactInfo: {
      name: 'Joe',
      email: 'joe@cacacala.com'
    },
    address: {
      street: '988 Kimberly Fort Apt. 921',
      city: 'Lake Tracy',
      state: 'Connecticut',
      zipCode: '07115',
      country: 'United States of America'
    }
  }

  it('renders with contact details', () => {
    cy.mount(<CustomerDetails customer={completeCustomer} onClick={backButtonClickHandler} />)

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
      contactInfo: null,
      address: {
        street: '5099 Murray Inlet',
        city: 'South Tiffany',
        state: 'Kentucky',
        zipCode: '08496',
        country: 'United States of America'
      }
    }
    cy.mount(<CustomerDetails customer={customer} onClick={backButtonClickHandler} />)

    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', 'Company name: Cocoa Cola').should('be.visible')
    cy.contains('p', 'Number of employees: 100').should('be.visible')
    cy.contains('p', 'Size: Small').should('be.visible')

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

  it('renders a fallback paragraph when address is not avaiblable', () => {
    const customerWithoutAddress = {
      ...completeCustomer,
      address: null,
    }
    cy.mount(<CustomerDetails customer={customerWithoutAddress} onClick={backButtonClickHandler} />)

    cy.contains('button', 'Show address').click()

    cy.contains('p', 'No address available').should('be.visible')
  })
})
