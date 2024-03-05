import './commands'

import '../../frontend/src/index.css'

import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
