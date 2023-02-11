/// <reference types="cypress" />

import BasePage from "../base-page";

class ClinicStaff extends BasePage {

 formSelector: string = '.form-group';
 sliderSelector: string = '.checkboxSlider';
 buttonSelector: string= '.button';
 serviceSelector: string = '#selectedServices';
 staffSelector: string = '.row';
 actionSelector: string = '.js-linkToggleUserStatus';
 checkboxSelector: string = '.js-checkboxIncludeInactiveUsers';
 statusSelector: string = '.js-labelPersonStatus';
 statusTest: any;
 saveSelector: string = '.button.default';

 
chooseService(name:string) : void {
    cy.get('.row.staff-row').contains(name).parent().contains('Details').click();
}

saveButton() : void {
    cy.get(this.saveSelector).click({force:true});
}


// checkBoxSliderServiceSetOn(name: string): void {
//     cy.get(name).parent().check({force:true});
// }


    //Please make sure that here you will use in quotation marks
//the id of the checkbox you want to manipulate and not the text in front of it.
//Because writing the project in a different way, this is an isolated
//situation where the id must be used (with # in front)
//For example : checkBoxSliderSetOn('#Service_IsTelehealth') and not
//checkBoxSliderSetOn('Telemedicine Service')
//The rule is mandatory for checkBoxSliderSetOff() method too.

    checkBoxSliderSetOn(name: string): void {
        cy.wait(300).get(name).parent().then(($button) => {
            if ($button.hasClass('redClass')) {
                cy.get(name).parent().click({force:true});
            }
        })
    }

    checkBoxSliderSetOff(name: string): void {
        cy.wait(300).get(name).parent().then(($button) => {
            if ($button.hasClass('greenClass')) {
                cy.get(name).parent().click({force:true});
            }
        })
    }

    markAllInactive () : void {
    cy.wait(800).get('.js-linkToggleUserStatus').each((item) => {
    const cardExists = item.text().includes('Mark user as inactive') 
    if (cardExists) {
      cy.wrap(item)
          .contains('Mark user as inactive')
      .click({force:true})
    }    
  })
}

clickOnDropdownUnmarked(name: string){
    cy.get(this.serviceSelector).parent().click();
    cy.get(`${this.serviceSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
      if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
        cy.wrap($button).click({force: true}).wait(800);
      }
    });

}

clickOnDropdownMarked(name: string){
    cy.wait(1200).get(this.serviceSelector).parent().click();
    cy.get(`${this.serviceSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
      if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == 0) {
        cy.wrap($button).click({force: true});      
      }
    });
}

markUserActive(name: string){ 
  cy.get(this.checkboxSelector).click().wait(800);
  cy.get(this.staffSelector).contains(name).then(($button) => {
    if ($button.parent().hasClass('inactive-user')) {
        cy.get(this.staffSelector).contains(name).parent().find(this.actionSelector).click({force:true});
    } 
  })
}

markUserInactive(name: string){ 
  cy.get(this.staffSelector).contains(name).then(($button) => {
    if (!$button.parent().hasClass('inactive-user')) {
        cy.get(this.staffSelector).contains(name).parent().find(this.actionSelector).click({force:true});
    } 
  })
}

clickOnDetails(name : string){
  cy.wait(2800).get(this.staffSelector).contains(name).parent().contains('Details').click().wait(800)
}

}

export default ClinicStaff
