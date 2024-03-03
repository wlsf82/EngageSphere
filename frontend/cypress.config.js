const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'yebzus',
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
