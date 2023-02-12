import { defineConfig } from 'cypress'

module.exports = {
  projectId: "uwh4c5",
  // The rest of the Cypress config options go here...
}

export default defineConfig({
  pageLoadTimeout: 140000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
})
