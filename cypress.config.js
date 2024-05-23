const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'yebzus',
  env: {
    API_URL: 'http://localhost:3001',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Use the production API URL if it's set, otherwise, use the default one.
      config.env.API_URL = process.env.API_URL_PROD ?
        process.env.API_URL_PROD :
        config.env.API_URL

      return config
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    indexHtmlFile: 'frontend/cypress/support/component-index.html',
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'frontend/cypress/support/component.js'
  },
})
