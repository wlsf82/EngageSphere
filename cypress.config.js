const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'yebzus',
  env: {
    API_URL: 'http://localhost:3001',
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
  },
})
