/// <reference types="cypress" />

import BasePage from "./base-page";
 class DrawerModal extends BasePage {

    private dropDownPractitionerSelectorID: string = '#SelectedPractitionersIds';
    private dropdownRoomSelector: string = '#SelectedRoomsIds';
    private checkMarkSelector: string = '.check-mark';
    cancelButtonSelector: string = '.button.no-select.pull-right';
    saveButtonSelector: string = '.button.default.no-select.pull-right';


    saveButton() : void {
        cy.get(this.saveButtonSelector).wait(500).click({force:true}).wait(500);
    }
    
    cancelButton() : void {
        cy.get(this.cancelButtonSelector).contains("Cancel").click({force:true});
    }

    clickOnDropdownMarked(name: string) {
        
        cy.get(this.dropDownPractitionerSelectorID).parent().click();
        cy.get(`${this.dropDownPractitionerSelectorID} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
          if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') > -1) {
            cy.wrap($button).click({force: true});      
          }
        });
    }

    clickOnDropdownMarkedTest() : void {
        
        cy.get(this.dropDownPractitionerSelectorID).parent().click();
        cy.get(`${this.dropDownPractitionerSelectorID} + .bootstrap-select .dropdown-menu li`).then(($button) => {
          for(let i=0; i < $button.length; i++){
            if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1 ) {
              console.log($button[0].parentElement.classList.value.indexOf('selected'))
              cy.wrap($button).eq(i).click().wait(600);
            }
          }
      });

    }

    clickOnDropdownUnmarked(name: string){
        
        cy.get(this.dropDownPractitionerSelectorID).parent().click();

        cy.get(`${this.dropDownPractitionerSelectorID} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
          if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
            cy.wait(1000).wrap($button).click({force: true});      
          }
        });

    }

    //It will be further developed for rooms that are already checked
     clickOnDropdownUnmarkedRooms(name: string){
         cy.get(this.dropdownRoomSelector).parent().click();
         cy.get(`${this.dropdownRoomSelector} + .bootstrap-select .dropdown-menu li`).contains(name).then(($button) => {
             if ($button[0] && $button[0].parentElement && $button[0].parentElement.classList.value.indexOf('selected') == -1) {
                 cy.wait(1000).wrap($button).click({force: true});
             }
         });

     }


 }

export default DrawerModal
