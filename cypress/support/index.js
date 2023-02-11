// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

let cachedResult = null;

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('readAndCacheApi', async (url) => {
    if (!cachedResult) {
        console.log('fetching')
        const result = await fetch(url)
        cachedResult = result
        return cachedResult
    } else {
        console.log('using cache')
        return cachedResult
    }
})

// Alternatively you can use CommonJS syntax:
// require('./commands')

