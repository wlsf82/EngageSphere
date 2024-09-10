import '../../src/index.css'

import 'cypress-axe'

import '../../../cypress/support/commands'

import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', mount)
