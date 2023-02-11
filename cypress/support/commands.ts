import 'cypress-file-upload';
declare namespace Cypress {
    interface Chainable<Subject> {
      generateToken(secret: any): Cypress.Chainable<void>;
    }
  }

  function generateToken(secret: any): void {
    // Generate token
  }



