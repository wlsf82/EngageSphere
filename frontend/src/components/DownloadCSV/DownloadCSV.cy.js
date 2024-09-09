import DownloadCSV from '.'

const customers = require('../../../../cypress/fixtures/customers.json').customers
const sampleCSV = require('../../../../cypress/fixtures/sampleCSV.js')

describe('<DownloadCSV />', () => {
  it('correctly downloads a list of customers as a CSV file', () => {
    cy.mount(<DownloadCSV customers={customers} />)

    cy.contains('button', 'Download CSV').click()

    cy.readFile('cypress/downloads/customers.csv').should('be.equal', sampleCSV)
  })
})
