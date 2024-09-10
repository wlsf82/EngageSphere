Cypress.Commands.add('getByClassStartsWith', classPart => {
  cy.get(`[class^="${classPart}"]`)
})
