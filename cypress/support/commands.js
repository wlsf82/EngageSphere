/// <reference path="./commands.d.ts" />

Cypress.Commands.add('getByClassThatStartsWith', classPart => {
  cy.get(`[class^="${classPart}"]`)
})
