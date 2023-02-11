/// <reference types="cypress" />

import DrawerModal from "../drawer-modal";

 class ClinicLocations extends DrawerModal {

 private location: string = '.footer-left-button';
 private rooms: string = '.footer-right-button';
 private editLocationButton : string ='.card-footer span:contains("Edit location")';
 private cardSelector : string = '.card-top-gradient';
 private cardLocations : string = '.card-locations';
 private addNewLocationSelector : string = '.js-pageActions';

 
 editLocation(value: number) : void { 
     cy.get(this.location).eq(value).click()
 }

 editRooms() : void { 
     cy.get(this.rooms)
 }

chooseAutomation(): void {
    cy.get('div.card').then($cards => {
        const cardExists = $cards.text().includes('Automation Location')
        if (cardExists) {
            cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/EditLocation?locationId=183&_=*').as('set')
            cy.contains('div.card', 'Automation Location')
            .find(this.editLocationButton)
            .click({force:true})
            cy.wait('@set')
        }
        })
      //cy.wait(700);
    }


//The method can be improved by eliminating cy.wait(). At this time we could not introduce intercepts for api's
//because it is a constantly repeating cycle and this would not be valid.
//Another method has to be adopted for this.
remainOneActive() : void {
  cy.get(this.cardSelector).each((item, index) => {
            cy.wait(600);
            cy.wrap(item)
            cy.get('.card-button.card-properties.footer-left-button').eq(0).click()
            cy.wait(260);
            this.setToOff('Clinic location is active?')
            cy.intercept('https://staging.unifiedpractice.com/Public/Clinic/LocationList?_=*').as('loc')
            cy.get(this.saveButtonSelector).click({force:true})
            cy.wrap(item)
            cy.wait('@loc')
});
    cy.wait(500)
    cy.contains('Edit location').first().click({force:true});
    cy.wait(500)
    this.setToOn('Clinic location is active?')
    cy.wait(500)
    cy.get(this.saveButtonSelector).click({force:true})
    cy.get(this.cardLocations).eq(0).not('inactive')
}


addNewLocation(): void { 
    cy.get(this.addNewLocationSelector).click();
}

}

export default ClinicLocations
