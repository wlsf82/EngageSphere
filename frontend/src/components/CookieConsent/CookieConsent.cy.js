import CookieConsent from './index'

describe('<CookieConsent />', () => {
  beforeEach(() => {
    cy.mount(<CookieConsent />)
  })

  it('renders correctly', () => {
    cy.contains(
      'p',
      'We use cookies 🍪 to ensure our application functions properly, to enhance user experience, and to gather insights on application usage.'
    ).should('be.visible')
    cy.contains(
      'p',
      'By clicking "Accept," you consent to our use of cookies. If you click "Decline," we won\'t use cookies, and your personal information will not be tracked.'
    ).should('be.visible')

    cy.contains('button', 'Accept')
      .should('be.visible')
      .and('be.enabled')
    cy.contains('button', 'Decline')
      .should('be.visible')
      .and('be.enabled')
  })
})