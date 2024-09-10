/// <reference path="./commands.d.ts" />

Cypress.Commands.add('getByClassStartsWith', classPart => {
  cy.get(`[class^="${classPart}"]`)
})
