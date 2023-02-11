/// <reference types="cypress" />

class OnboardingForms{

    private sectionSelector: string = '.upform';
    private idScreeningForm: string ='#servicesDropDown_583'
    private dropdownOpener: string = '.dropdown-menu.open'

    changeServiceOnScreeningForm(){

        //cy.wait(800).get(this.sectionSelector).contains('testscreening').parent().click()
        cy.get('.dropdown-toggle').contains('testscreening').parent().click()

    }

    //WILL BE IMPROVED WITH SENSE FUNCTION FOR SELECTED ITEMS

    changeStateCCPEScreeningForms(): void {
        cy.contains('testscreening').next().next().click().within(() => {cy.get('.text').eq(1).click({force:true})})
        cy.wait(300)
    }

    changeExistingPatientScreeningForms(): void {
        cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(2).click({force:true})})
        cy.wait(300)
    }

    changeNewPatientScreeningForms(): void {
        cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(1).click({force:true})})
        cy.wait(300)
    }

    visibilityForAllScreeningForms(): void {
    cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(0).click({force:true})})
    cy.wait(300)
    }

    activateScreeningForms(): void{
        cy.get('[type="checkbox"]').check()
        cy.contains('testscreening').next().next().next().click().within(() => {cy.get('.text').eq(0).click({force:true})})
        cy.wait(300)
    }

}

export default OnboardingForms
