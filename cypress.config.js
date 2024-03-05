const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'yebzus',
  env: {
    API_URL: 'http://localhost:3001',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}'
  },
})
