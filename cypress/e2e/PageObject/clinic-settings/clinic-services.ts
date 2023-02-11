/// <reference types="cypress" />

import BasePage from "../base-page";

class ClinicServices extends BasePage {

    formSelector: string = '.form-group';
    sliderSelector: string = '.checkboxSlider';
    private dropdownPractitionerSelector: string = '#SelectedPractitionersIds'
    private dropdownRoomsSelector: string = '#SelectedRoomsIds'



checkBoxSliderServiceSetOn(name: string): void {
    cy.get(name).parent().click({force:true});
}

    chooseService(name:string) : void {
        cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();
    }


//Please make sure that here you will use in quotation marks
//the id of the checkbox you want to manipulate and not the text in front of it. 
//Because writing the project in a different way, this is an isolated
//situation where the id must be used (with # in front)
//For example : checkBoxSliderSetOn('#Service_IsTelehealth') and not
//checkBoxSliderSetOn('Telemedicine Service')
//The rule is mandatory for checkBoxSliderSetOff() method too.

checkBoxSliderSetOn(name: string): void {
    cy.get(name).parent().then(($button) => {
        if ($button.hasClass('redClass')) {
            cy.get(name).parent().click({force:true});
        } 
    })
}

checkBoxSliderSetOff(name: string): void {
    cy.get(name).parent().then(($button) => {
        if ($button.hasClass('greenClass')) {
            cy.get(name).parent().wait(600).click({force:true});
        } 
    })
}

    clickOnDropdownMarkedPractitioners(name: string){
        cy.get(this.dropdownPractitionerSelector).parent().click();
        cy.get(`${this.dropdownPractitionerSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
            if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == 0) {
                cy.wait(1000).wrap($button).click({force: true});
            }
        });

    }

    clickOnDropdownUnmarkedPractitioners(name: string){
        cy.get(this.dropdownPractitionerSelector).parent().click();
        cy.get(`${this.dropdownPractitionerSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
            if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
                cy.wait(1000).wrap($button).click({force: true});
            }
        });

    }

    clickOnDropdownUnmarkedRooms(name: string){
        cy.get(this.dropdownRoomsSelector).parent().click();
        cy.get(`${this.dropdownRoomsSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
            if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
                cy.wait(1000).wrap($button).click({force: true});
            }
        });

    }



}

export default ClinicServices
