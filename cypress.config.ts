import { defineConfig } from 'cypress'

module.exports = defineConfig({
  projectId: 'uwh4c5',
})

export default defineConfig({
  testFiles: 'automation-cloud/cypress/e2e/Tests/*.spec.ts',
  pageLoadTimeout: 140000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: 'automation-cloud/cypress/e2e/**/*.spec.ts',
  },
})
