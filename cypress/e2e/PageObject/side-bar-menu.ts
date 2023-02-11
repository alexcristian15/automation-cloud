/// <reference types="cypress" />
import "cypress-localstorage-commands"

class SideBarNavigate  {
    public level1Selector: string = '.menu-level-1';
    public level2Selector: string = '.menu-level-2';
    public arrowSelector: string = '.hamburger-arrow-left';

    selectCalendar() : void {
        cy.get(this.level1Selector).eq(1).click({force:true});
    }

    extendMenu() : void{
        cy.get('.navbar-header-left').then(($el) => {
            if ($el.hasClass('small')) {
                cy.get(this.arrowSelector).click({force:true})
            }
        })
    }

    selectMyPatients() : void {
        cy.get(this.level1Selector).eq(2).click();
        cy.get(this.level2Selector).eq(0).click();
    }

    selectAllClinicPatients (): void {
        cy.get(this.level1Selector).eq(2).click();
        cy.get(this.level2Selector).eq(1).click();
    }

    selectPP(): void {
       // cy.intercept('https://data.pendo.io/data/ptm.gif/',{statusCode: 200, fixture: 'avoid'}).as('url')
        cy.get(this.level1Selector).eq(9).click()
        cy.wait(2000)
    }

    selectCS(name: string) : void {
        
        cy.get(this.level1Selector).eq(10).click({force:true});
        cy.get(this.level2Selector).contains(name).click({force:true});

    }

    selectLiveChat(): void{
        cy.get(this.level1Selector).eq(3).invoke('removeAttr', 'target').click();
    }
}

export default SideBarNavigate
