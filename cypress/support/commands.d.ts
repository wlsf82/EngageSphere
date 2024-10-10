/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * "Short" for cy.get(`[class^="${classPart}"]`)
     *
     * @param classPart string - The string that represents the starting of a CSS class
     *
     * @example cy.getByClassThatStartsWith('ThemeToggle_button') // get an element which has a class that starts with 'ThemeToggle_button'
     * @example cy.getByClassThatStartsWith('Messenger_form').find('form input[type="text"]') // get an element which has a class that starts with 'Messenger_form', and from it, find another element
     */
    getByClassThatStartsWith(classPart: string): void | Cypress.Chainable<null>
  }
}
