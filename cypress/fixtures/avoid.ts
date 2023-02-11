cy.intercept('https://data.pendo.io/data/ptm.gif/*', {statusCode: 200, fixture: 'avoid'}).as('pp')
