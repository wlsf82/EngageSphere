import { Check } from 'lucide-react'

import Button from '.'

describe('<Button />', () => {
  it('renders with a sample text', () => {
    cy.mount(<Button text="Back" />)

    cy.contains('button', 'Back').should('be.visible')
  })

  it('renders with an icon and text', () => {
    cy.mount(<Button icon={<Check />} text="Done" />)

    cy.get('button svg.lucide-check').should('be.visible')
    cy.contains('button', 'Done').should('be.visible')
  })

  it('renders disabled and prevents click handler execution', () => {
    const onClick = cy.stub().as('onClick')

    cy.mount(
      <Button
        text="I'm disabled"
        disabled={true}
        onClick={onClick}
      />
    )

    cy.contains('button', "I'm disabled")
      .should('be.visible')
      .and('be.disabled')
      .click({ force: true })

    cy.get('@onClick').should('not.have.been.called')
  })
})
