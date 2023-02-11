/// <reference types="cypress" />
class AddClinicLocation{

private formSelector : string = '.form-control';


addDetails (name:string,details:string): void {
    cy.get('.form-group').contains(name).parent().find('.form-control').type(details);
}
}

export default AddClinicLocation