/// <reference types="cypress" />
import { format } from 'date-fns'
import PatientPortal from "./patient-portal";
export const getDayMonthHour: string = format(new Date(), "MMMMddhmm")
//const pp = new PatientPortal() ;


class PatientList {

    private tabSelector: string = '.ui-tabs-anchor';
    private appointmentsIdSelector: string = '#ui-id-3';
    private billingIdSelector: string = '#ui-id-4';
    private formsIdSelector: string = '#ui-id-5';
    private insuranceIdSelector: string = '#ui-id-6';
    private personalIdSelector: string = '#ui-id-7';
    private messagesIdSelector: string = '#ui-id-8';
    private medicalIdSelector: string = '#ui-id-9';
    private filesIdSelector: string = '#ui-id-10';
    private emailField: string = '#emailAddPatient';
    private sendInviteModalSelector: string = '.js-send_pp_invite_btn';
    private sendInviteButtonSelector : string = '.js-sendInvite'
    private buttonPrimarySelector: string = '.btn-primary';
    private mainMenuPatientSelector: string = '.main-menu';

    searchPatient(name: any): void{
        cy.get('.ui-state-default.ui-corner-top').eq(1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/PatientList?PartialName=*').as('waiting')//here it will be implemented a intercept method for get all patients
        cy.get('#patientHint').click().type(name)
        cy.wait('@waiting')
        cy.wait(400)
        cy.get('.patient-box').eq(0).click()
        // cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/PatientFileAppointmentsTab?patientId=*').as('visible')
        // cy.contains(name).should('be.visible')
        // cy.wait('@visible')
    }

    addNewPatient(): void {
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/AddPatient?_=*').as('patient');
        cy.contains('Add Patient').click();
        cy.wait('@patient')
        this.completeField('First Name','Automation'+getDayMonthHour);
        this.completeField('Last Name','Engineer'+getDayMonthHour);
        cy.get(this.emailField).click().clear().type('engineer'+getDayMonthHour+'@email.com');
        cy.contains('Save').click()
    }

    sendInviteForPP(): void {
        cy.wait(400).get(this.sendInviteModalSelector).click();
        cy.wait(400).get(this.sendInviteButtonSelector).click()
    }

    validateNewPPAccountEmail(): void{
        //Go to staging emails
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(0).invoke('removeAttr', 'target').click()
        this.completeField('Password', 'password')
        this.completeField('Confirm Password', 'password')
        cy.get(this.buttonPrimarySelector).click()
    }

    completeField(name: string, content: any): void
    {
        cy.contains(name).next({force:true}).clear().type(content);
    }

    goToFormsTab(): void {
        cy.get(this.mainMenuPatientSelector).within(() =>
            cy.get(this.formsIdSelector).click({force:true})
        )
    }

    goToMedicalTab(): void {
        cy.get(this.mainMenuPatientSelector).within(() =>
            cy.get(this.medicalIdSelector).click({force:true})
        )
    }

    goToPersonalTab(): void{
        cy.get(this.mainMenuPatientSelector).within(() =>
            cy.wait(500).get(this.personalIdSelector).click({force:true})
        )

    }

    checkVisibilityPersonalDetails(details:string) : void {
        cy.wait(500).contains(details).should('exist')
    }
}

export default PatientList
