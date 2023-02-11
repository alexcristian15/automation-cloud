/// <reference types="cypress" />

import {
    PP_API,
    PP_API_URL,
    FINAL_API,
    API_URL,
    API_BASEPP_URL,
    FINAL_API_STAGING_PP,
    FINAL_API_STAGING_PP_UNIVERSITY
} from "../../constants";
import BasePage from "./base-page";
import 'cypress-wait-until';
import { format, addDays} from 'date-fns';
import {getDayMonthHour} from "./patient-list";
const { uniqueNamesGenerator, Config, adjectives, colors } = require('unique-names-generator');
export const confirm = Math.floor(Math.random() * 22)

class PatientPortal extends BasePage {
    private radioSelector: string = '.md-radio';
    private formControl: string = '.form-control';
    private loginButton: string = '.btn-login';
    private radioTabSelector: string = '.md-radio-tab';
    private randomize: any;
    private buttonSelector: string = 'o-button';
    private messageSuccess: string = 'Settings saved successfully';
    private forgotFieldSelector: string = '.form-control.inp'
    private buttonLoginandResetSelector : string ='.btn.btn-primary.btn-login'
    private iconCalendarSelector: string = '.mat-icon-button';
    private calendarPeriodSelector: string = '.mat-calendar-period-button';
    private calendarArrowSelector: string = '.mat-calendar-arrow.mat-calendar-invert';
    private calendarArrowSelector: string = '.mat-calendar-arrow.mat-calendar-invert';
    private yearTabSelector: string = '.mat-calendar-body-cell-content.mat-focus-indicator';
    private optionTextSelector: string = '.mat-option-text';
    private selectValueSelector: string = '.mat-select-value';
    private loginButtonSelector: string = '.login-btn.mat-flat-button.mat-primary';
    private burgerMenuSelector: string = '.burger-menu';
    private boxSelector: string = '.select-box';
    private fieldArrowSelector: string = '.mat-option.mat-focus-indicator';
    private secondArrowSelector: string ='.mat-select-arrow-wrapper';
    private checkboxSelector: string ='.mat-checkbox-inner-container';
    private buttonPrimarySelector: string ='.btn-primary';
    private headerChatSelector: string = '.chat-header-title';
    private iconSelector : string = '.material-icons';
    public bookApointmentSelector : string = '.text-right';
    private uploadLiveChatSelector: string = '.rfu-file-upload-button';
    private secondSelectBoxSelector
    private usernameLogin: string= 'automation4@email.com';
    private passwordLogin: string = 'password';

    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        length: 2,
        separator: ' ',
        style: 'capital'
    });

    openPP(): void {
        cy.intercept(`${FINAL_API_STAGING_PP()}`).as('ppOrganization');
        cy.contains('https://pp.staging.unifiedpractice.com/automation').should('be.visible').get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click()
        cy.wait(2000)
        cy.wait('@ppOrganization');
        //It is desired to eliminate this wait, but sometimes in tests the intercept is not enough
        cy.wait(1500)
    }

    openPPUniveristy(): void {
        cy.intercept(`${FINAL_API_STAGING_PP_UNIVERSITY()}`).as('ppOrganization');
        cy.contains('https://pp.staging.unifiedpractice.com/automation-cypress-university').should('be.visible').get('.label-pp-url').eq(1).invoke('removeAttr', 'target').click()
        cy.wait(2000)
        cy.wait('@ppOrganization');
        //It is desired to eliminate this wait, but sometimes in tests the intercept is not enough
        cy.wait(1500)
    }

    checkVisibilityBookAppointmentButton(): void{
        cy.get(this.bookApointmentSelector).should('be.visible');
    }
    saveButton(): void {
        cy.contains('Save').click();
        cy.contains(this.messageSuccess).should('be.visible');
    }

    selectRadio(value: number): void {
        cy.get(this.radioSelector).eq(value).click();
    }

    chooseRandomHour(): void {
        this.randomize = Math.floor(Math.random() * this.radioTabSelector.length)
        cy.get(this.radioTabSelector).eq(this.randomize).click();
        }

    //Need to be improved with intercept
    interceptAndWaitForAvailabilities(): void{
            cy.wait(500)
            // cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Availabilities?LocationGuid=*').as('hour')
            // cy.wait('@hour')
        }

    loginCredentials(email,password): void {
        cy.get(this.formControl).eq(0).type(email);
        cy.get(this.formControl).eq(1).type(password);
    }
    
    selectLocation(name: string) : void { 
        cy.contains(name).click();
    }

    selectService(name: string) : void { 
        cy.contains(name).click();
    }

    selectPractitioner(name: string) : void { 
        cy.contains(name).click();
    }

    pressLogin(): void {
        cy.get(this.loginButton).click();
    }

    checkSuccessLogin() : void {
        cy.contains('Upcoming').should('be.visible');
    }

    proceedLogin() : void {
        cy.get('.inp').eq(0).click().type('automation4@email.com');
        cy.contains('Password').parent().click().type('password');
        cy.get(this.loginButtonSelector).click();
    }

    checkLogin() {
        cy.get(this.burgerMenuSelector).click();
        cy.get('.mat-menu-item').then(($el) => {
            if($el.text().includes('Logout')){
                cy.get(this.burgerMenuSelector).click({force:true});
                cy.contains('Logout').click({force:true});
                cy.wait(700);
            }
            cy.get('.logo-symbol').click({ force: true })
            cy.get('.mat-menu-content').click({ force: true });
        })
          }

        shouldBeVisible(name: string): void {
            cy.wait(1500).contains(name).should('be.visible')
        }

        shouldNotBeVisible(name: string): void {
            cy.wait(500).contains(name).should('not.exist')
        }

    setToOff(name:string): void {
        cy.contains('div', name)
            .parent()
            .within(() => {
                cy.get('input[type="checkbox"]').uncheck({force: true})
            })
    }

    setToOn(name:string): void {
        cy.contains('div', name)
            .parent()
            .within(() => {
                cy.get('input[type="checkbox"]').check({force: true})
            })
    }

        checkAvailability(): void {
           this.interceptAndWaitForAvailabilities();
            cy.get(this.boxSelector).then($box => {
                const noAvailability = $box.text().includes('No time slots available. Please change interval or select another practitioner.')
                if (noAvailability) {
                    //this.interceptAndWaitForAvailabilities();
                    cy.wait(700)
                    cy.contains('Next week').click();
                }
        }
            )}

        //Please make sure before you use this method, that in your test there is the flow for the 'Automation Location' location to be active.
        // If this detail is ignored, the test may break.

        bookNewAppointment(): void {
            cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
            cy.contains('Book Appointment').click({force:true});
            this.checkLocationsNumber();
            cy.contains('Automation with CCPE').click();
            this.checkPractitionersNumber();
            this.checkAvailability();
            cy.contains('Select an appointment').should('be.visible')
            cy.wait(500)
            cy.get(this.radioTabSelector).eq(Math.floor(Math.random() * this.radioTabSelector.length)).click({force:true})
            cy.contains('Confirm Appointment').click();
            cy.contains('Your appointment was successfully booked').should('be.visible');
            cy.contains('Dashboard').click()
        }

    bookSimilar(): void {
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Similar').click({force:true});
        this.checkLocationsNumber();
        // cy.contains('Automation with CCPE').click();
        // this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(500)
        cy.get(this.radioTabSelector).eq(Math.floor(Math.random() * this.radioTabSelector.length)).click({force:true})
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }


    bookNewAppointmentAutomationEngineer(): void {
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.contains('Automation with CCPE').click();
        cy.contains('Automation Engineer').click();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(500)
        cy.get(this.radioTabSelector).eq(Math.floor(Math.random() * this.radioTabSelector.length)).click({force:true})
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }

    bookNewAppointmentASAP(): void {
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.wait(500)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        this.searchAM();
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(1400)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }

    bookNewAppointmentASAPAutomationWithCCPE(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.wait(500)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(400)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(1000)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully booked').should('be.visible');
        cy.contains('Dashboard').click()
    }

    checkPractitionersNumber(): void {
        //this.interceptAndWaitForAvailabilities();
        cy.get(this.boxSelector).then($box => {
            const moreThanOne = $box.text().includes('Select practitioner')
            if (moreThanOne) {
               // this.interceptAndWaitForAvailabilities();
                cy.contains('Automation Engineer').click();
            }
        })
    }

    checkLocationsNumber(): void {
        cy.wait(800)
        console.log('checkprac1')
        //this.interceptAndWaitForAvailabilities();
        cy.get(this.boxSelector).then($box => {
            const moreThanOne = $box.text().includes('Select a location')
            if (moreThanOne) {
                // this.interceptAndWaitForAvailabilities();
                cy.get('.row-md-radio').children().contains('Automation Location').click({force:true});
                console.log('checkpract2')
            }
        })
    }



    textInBox(parent:string, value: string): void {
        cy.contains('div', parent)
            .parent() //Moves to parent div row
            .within(() => { //scopes the commands within the above div row
                cy.get('.form-control').click().clear().type(value);
            })
    }

    //Another intercept would be ideal in this method
    checkVisibilityUpcoming(): void {
        cy.wait(1500)
        cy.get('.mat-flat-button.mat-primary.mat-button-base').then($button => {
            if($button.text().includes('Show more upcoming')) {
                cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=2&Take=6&Skip=*').as('upcoming')
                cy.contains('Show more upcoming').click()
                cy.wait('@upcoming')
                    .then(() => this.checkVisibilityUpcoming())
            }
        })
    }

    checkForNoPreferenceStateOn(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.contains('Automation with CCPE').click();
        cy.contains('have a preference').should('be.visible')
    }

    checkForNoPreferenceStateOff(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        this.checkLocationsNumber();
        cy.contains('Automation with CCPE').click();
        cy.contains('have a preference').should('not.exist')
    }

    roundAvailabilities(name: string): void{
        cy.get('.dx-dropdowneditor-icon').click();
        cy.contains(name).click({force:true});
    }

    checkRoundAvailabilities(): void{
        cy.contains('Upcoming Appointments').should('have.css', 'display', 'none');
        cy.contains('Book Appointment').click({force:true});
        cy.wait(400)
        this.checkLocationsNumber();
        cy.wait(400)
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber();
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
    }

    setAvailabilitiesIntervalToCheckFor30Minutes(): void {
        cy.wait(500)
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('be.visible');
        cy.contains(':15').should('not.exist');
        cy.contains(':45').should('not.exist');
    }

    setAvailabilitiesIntervalToCheckFor15Minutes(): void {
        cy.wait(500)
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('be.visible');
        cy.contains(':15').should('be.visible');
        cy.contains(':45').should('be.visible');
    }

    setAvailabilitiesIntervalToCheckFor60Minutes(): void {
        cy.contains(':00').should('be.visible');
        cy.contains(':30').should('not.exist');
        cy.contains(':15').should('not.exist');
        cy.contains(':45').should('not.exist');
    }

    checkTodayToBeHidden(): void{
        var todaysDate = format(new Date(), "MMMM d")
        cy.get('.calendar-row').contains(todaysDate).should('not.exist')
    }

    checkFeature30Days(): void{
        const today = new Date();
        var featureDay = format ( addDays (today, 30), "MMMM dd")

        cy.get('.calendar-row').then(($el) => {
            const oneMonth = $el.text().includes(featureDay)
            console.log($el.text())
            if(!oneMonth){
                cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Availabilities?LocationGuid=*').as('next')
                cy.wait(500)
                cy.contains('span', 'Next week').click()
                cy.wait('@next')
                    .then( () =>this.checkFeature30Days() )

            }
            this.checkFeature30Days();

        })
    }

    searchAM(): void{

        cy.get('.md-radio-tab').eq(0).then(($el) => {
            const checkAM = $el.text().includes('AM')
            if(!checkAM){
                cy.wait(500)
                cy.contains('PM').should('be.visible')}
        })

    }

    checkReschedule(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.wait(900)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.wait(500)
        cy.contains('Confirm Appointment').click();
        cy.contains('Your appointment was successfully rescheduled').should('be.visible');
        cy.contains('Dashboard').click()
    }

    cancelAppointment(): void{
        cy.wait(1500).contains('Cancel').eq(0).click({force:true});
        cy.wait(500)
        cy.get('.textarea-modal').type('Reason for cancel text')
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments/*/cancel').as('cancel')
        cy.contains('Cancel Appointment').click()
        cy.wait('@cancel')
        cy.wait(500)
        cy.contains('Cancel').should('not.be.visible')
    }

    cancelAppointmentUniversity(): void{
        cy.contains('Cancel').eq(0).click({force:true});
        cy.wait(2500)
        cy.get('.textarea-modal').type('Reason for cancel text')
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress-university/Appointments/*/cancel').as('cancel')
        cy.contains('Cancel Appointment').click()
        cy.wait('@cancel')
        cy.wait(500)
        cy.contains('Cancel').should('not.be.visible')
    }


    checkRescheduleWithNoLocationAvailable(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The location you selected is no longer available. Please select another location from the list below').should('be.visible');

    }

    checkRescheduleWithNoServiceAvailable(): void{
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The service you selected is no longer available. Please select another service from the list below').should('be.visible');

    }

    //Need to be improved with intercept()
    checkBookSimilarWithNoLocationAvailable(): void{
        cy.wait(1200)
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The location you selected is no longer available. Please select another location from the list below').should('be.visible');
    }

    checkBookSimilarWithNoServiceAvailable(): void{
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The service you selected is no longer available. Please select another service from the list below').should('be.visible');
    }

    checkRescheduleWithNoPractitionerAvailable() : void{
        cy.wait(400)
        cy.contains('Reschedule').eq(0).click();
        cy.contains('The practitioner you selected is no longer available. Please select another practitioner from the list below').should('be.visible')
    }

    checkBookSimilarWithNoPractitionerAvailable() : void{
        cy.contains('Book Similar').eq(0).click();
        cy.contains('The practitioner you selected is no longer available. Please select another practitioner from the list below').should('be.visible');
    }

    createAccountProceed() : void {
        cy.contains('first time patient').click();
        cy.contains('Automation with CCPE').click();
        this.checkPractitionersNumber()
        this.checkAvailability();
        cy.contains('Select an appointment').should('be.visible')
        cy.wait(700)
        cy.get(this.radioTabSelector).eq(0).click({force:true})
        cy.contains('Create Account').click();
        cy.get('.email-input').click().type('test' + (Math.floor(Math.random() * 1000)) + '@test.com' );
        cy.get('.mat-button-wrapper').contains('Create Account').click();

        //Go to staging emails
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').contains('Verify email').click()

        //Complete all data for create a new account and go to dashboard
        this.completeField('First Name', 'Test First Name Field')
        this.completeField('Last Name', 'Test Last Name Field')
        cy.get(this.formControl).eq(3).type(Math.floor(Math.random() * 123456789))
        cy.get(this.selectValueSelector).eq(0).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 3)+1).click()
        cy.get(this.iconCalendarSelector).eq(1).click();
        this.chooseRandomDateFormsCalendar();
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 3)+1).click()
        this.completeField('Password', 'password')
        this.completeField('Confirm Password', 'password')
        cy.get(this.checkboxSelector).click();
        cy.contains('Continue').click().wait(800)
        cy.contains('Appointment summary').should('be.visible')
        cy.get(this.buttonPrimarySelector).click()
        cy.contains('Dashboard').click();
    }

    completeField(name: string, content: any): void
    {
        cy.contains(name).next({force:true}).clear().type(content);
    }

    //Method only for new accounts created
    completeAllForms(): void{
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Locations').as('loc')
        cy.contains('Complete Forms').click();
        cy.get('.col-12.edit-col').eq(0).click()
        cy.wait('@loc')

        //Patient Information - Not finished
        this.completeField('First Name', 'Automation Engineer')
        this.completeField('Middle Name', this.randomName)
        this.completeField('Last Name',this.randomName)

        cy.get(this.iconCalendarSelector).eq(1).click()
        cy.get(this.calendarPeriodSelector).click()
        cy.get(this.calendarArrowSelector).click()
        cy.get(this.yearTabSelector).eq(Math.floor(Math.random() * 22)+1).click().wait(300)
        cy.get(this.selectValueSelector).eq(0).click()
        cy.get(this.fieldArrowSelector).eq(1).click()
        this.completeField('Occupation','Engineer Test Field')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 2)+1).click()
        cy.get(this.selectValueSelector).eq(2).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 2)+1).click()
        cy.contains('Save').click()

        //Address & Contact Information
        this.completeField('Street Address', 'Street Address Test Input')
        this.completeField('Street Address Line 2', 'Street Address Test Input 2')
        //The completeField logic method cannot be used here
        cy.get('.form-control.ng-pristine').eq(0).click().clear().type('012345678')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(1).click()

        cy.get('.form-control.ng-pristine').eq(1).click().clear().type('012345678')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(2).click()

        cy.get(this.selectValueSelector).eq(2).click()
        cy.get(this.fieldArrowSelector).eq(2).click()
        this.completeField('State','Ilfov')

        cy.get('.form-control.ng-pristine').eq(2).click()
        this.completeField('City','Bucharest')
        this.completeField('Zip Code','123123')
        this.completeField('Fax Number','+39420329312')
        cy.contains('Save').click()

        //Emergency Contact Information
        this.completeField('Contact Name', 'Contact Name Test Field')
        this.completeField('Email', 'automation4@email.com')
        this.completeField('Contact Phone Number', '+4012345678')
        this.completeField('Alternate Phone', '+4012345678')
        cy.get(this.secondArrowSelector).click();
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 9)+1).click()
        cy.contains('Save').click()

        //Primary Physician Information

        this.completeField('Physician Name', 'Physician Name Test Field')
        this.completeField('Phone Number', '+4012345678')
        this.completeField('Specialty', 'Engineer')
        this.completeField('Current Treatment Plan', 'Paracetamol')
        cy.contains('Save').click()

        //Medical Information

        //Check medications slider is set to on; if not, proceed
        cy.get('#switch-showMedication').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check vitamins and supplements slider is set to on; if not, proceed
        cy.get('#switch-showVitamins').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check alelrgies slider is set to on; if not, proceed
        cy.get('#switch-showAllergies').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check medical devices slider is set to on; if not, proceed
        cy.get('#switch-showMedicalDevices').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        this.completeField('Medication Name', 'Medication Name Test Field')
        this.completeField('Dosage', '1550mg')
        this.completeField('Frequency / Duration', 'twice a day for 10 weeks')

        cy.get(this.iconCalendarSelector).eq(1).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(2).click()
        this.chooseRandomDateFormsCalendar()

        this.completeField('Vitamin/Supplement Name', 'Vitamina D')
        this.completeField('Dosage', '1000mg')
        this.completeField('Frequency / Duration', 'at 4 days')
        this.completeField('Vitamin/Supplement Name', 'Vitamina D')

        cy.get(this.iconCalendarSelector).eq(3).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(4).click()
        this.chooseRandomDateFormsCalendar()

        this.completeField('Allergy', 'Butter')
        this.completeField('Reaction', 'Headache')


        cy.get(this.iconCalendarSelector).eq(5).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(6).click()
        this.chooseRandomDateFormsCalendar()

        cy.get('input[placeholder="Device-placeholder"]').clear().type("EKG" + confirm);

        cy.get(this.iconCalendarSelector).eq(7).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(8).click()
        this.chooseRandomDateFormsCalendar()

        cy.contains('Save').click()

        cy.contains('Additional').should('be.visible')
        cy.contains('Save').click()


    }



    goToMyAccount() : void {
        cy.wait(1300).get(this.burgerMenuSelector).click();
        cy.contains('My Account').click();
    }

    activateEmailNotifications() : void {
        cy.get('#switch-input').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })
    }

    deactivateEmailNotifications() : void {
        cy.get('#switch-input').then(($ele) => {
            if ($ele.is(':checked')) {
                cy.wrap($ele).uncheck({force:true})
            }
        })
    }

    activateSMSNotifications() : void {
        cy.get('#switch-input1').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })
    }

    deactivateSMSNotifications() : void {
        cy.get('#switch-input1').then(($ele) => {
            if ($ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })
    }

    changePassword() : void {
        cy.contains('Change Password').click();
        cy.contains('Old password').next().click().type('password')
        cy.contains('New Password').next().click().type('passwordnew')
        cy.contains('Confirm New Password').next().click().type('passwordnew')
        cy.contains('Save').click();

        cy.get('.inp').eq(0).click().type('automation4@email.com');
        cy.contains('Password').parent().click().type('passwordnew');
        cy.get('.login-btn.mat-flat-button.mat-primary').click();

        //Clear

        this.goToMyAccount()
        cy.contains('Change Password').click();
        cy.contains('Old password').next().click().type('passwordnew')
        cy.contains('New Password').next().click().type('password')
        cy.contains('Confirm New Password').next().click().type('password')
        cy.contains('Save').click();

        cy.get('.inp').eq(0).click().type('automation4@email.com');
        cy.contains('Password').parent().click().type('password');
        cy.get('.login-btn.mat-flat-button.mat-primary').click();

        cy.contains('Automation Location').should('be.visible')
    }

    forgotPassword() : void{
        cy.contains('Forgot password?').click();
        cy.get(this.forgotFieldSelector).click().type('automation4@email.com')
        cy.contains('Send Me Instructions').click();
        cy.contains('Instructions Sent!').should('be.visible');

        //Go to staging emails and click on right email
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').contains('password reset link').click()

        cy.contains('Password').next().click().clear().type('password')
        cy.contains('Confirm Password').next().click().clear().type('password')
        cy.get(this.buttonLoginandResetSelector).click();
    }

    goToStagingEmailandAcceptAppointment() : void{
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').contains('Accept').click()
    }

    goToStagingEmailandRejectAppointment() : void{
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').contains('Reject').click()
    }

    selectCompleteFormsAndCompletePatientInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        //cy.get(this.burgerMenuSelector).click({force:true});

        cy.wait(300).get('.select-box').eq(1).within(() =>
            cy.get('.edit-col').eq(0).click({force:true}))

        this.completeField('First Name', 'Automation ')
        this.completeField('Middle Name', 'Engineer')
        this.completeField('Last Name', 'E')

        cy.get(this.iconCalendarSelector).eq(1).click()
        cy.get(this.calendarPeriodSelector).click()
        cy.get(this.calendarArrowSelector).click()
        cy.get(this.yearTabSelector).eq(Math.floor(Math.random() * 22)+1).click().wait(300)
        cy.get(this.selectValueSelector).eq(0).click()
        cy.get(this.fieldArrowSelector).eq(1).click()
        this.completeField('Occupation','Engineer Test Field')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 2)+1).click()
        cy.get(this.selectValueSelector).eq(2).click()
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 2)+1).click()
        cy.contains('Save').click()
    }

    selectCompleteFormsAndCompleteContactInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        //cy.get(this.burgerMenuSelector).click({force:true});

        cy.wait(300).get('.select-box').eq(1).within(() =>
            cy.get('.edit-col').eq(1).click({force:true}))

        this.completeField('Street Address', 'Street Address Test Input')
        this.completeField('Street Address Line 2', 'Street Address Test Input 2')
        //The completeField logic method cannot be used here
        cy.get('.form-control.ng-pristine').eq(0).click().clear().type('012345678')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(1).click()

        cy.get('.form-control.ng-pristine').eq(1).click().clear().type('012345678')
        cy.get(this.selectValueSelector).eq(1).click()
        cy.get(this.fieldArrowSelector).eq(2).click()

        cy.get(this.selectValueSelector).eq(2).click()
        cy.get(this.fieldArrowSelector).eq(2).click()
        this.completeField('State','Ilfov')

        cy.get('.form-control.ng-pristine').eq(2).click()
        this.completeField('City','Bucharest')
        this.completeField('Zip Code','123123')
        this.completeField('Fax Number','+39420329312')
        cy.contains('Save').click()
        this.checkForDrawing()
        this.checkFinalStepForms()
    }

    selectCompleteFormsAndCompleteEmergencyInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        //cy.get(this.burgerMenuSelector).click({force:true});

        cy.wait(2400).get('.select-box').eq(1).within(() =>
            cy.get('.edit-col').eq(2).click({force:true}))

        this.completeField('Contact Name', 'Contact Name Test Field')
        this.completeField('Email', 'automation4@email.com')
        this.completeField('Contact Phone Number', '+4012345678')
        this.completeField('Alternate Phone', '+4012345678')
        cy.get(this.secondArrowSelector).click();
        cy.get(this.fieldArrowSelector).eq(Math.floor(Math.random() * 9)+1).click()
        cy.contains('Save').click()
    }

    selectCompleteFormsAndCompletePrimaryPhysicianInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        // cy.get(this.burgerMenuSelector).click({force:true});

        cy.get('.pp-container').then( ($selectBox) =>{
            const secondBoxExist = $selectBox.text().includes('Thanks');
            if (secondBoxExist) {
                cy.wait(600).get(this.boxSelector).within(() =>
                    cy.get('.edit-col').eq(3).click({force: true}))
            } else {
                cy.wait(600).get(this.boxSelector).eq(1).within(() =>
                    cy.get('.edit-col').eq(3).click({force: true}))
            }
        })

        // cy.get(this.boxSelector).then( ($selectBox) =>{
        //     const secondBoxExist = $selectBox.text().includes('Online Forms');
        //     if (secondBoxExist) {
        //         cy.wait(600).get(this.boxSelector).within(() =>
        //             cy.get('.edit-col').eq(3).click({force: true}))
        //     }
        // })


        this.completeField('Physician Name', 'Physician Name Test Field')
        this.completeField('Phone Number', '+4012345678')
        this.completeField('Specialty', 'Engineer')
        this.completeField('Current Treatment Plan', 'Paracetamol' + getDayMonthHour)
        cy.contains('Save').click()
    }

    checkForDrawing() : void{
        cy.get(this.boxSelector).then(($box) => {
            const checkSaveButtonExist= $box.text().includes('draw');
            if (checkSaveButtonExist) {
                cy.get('.grid-stack-item-content').trigger('mousedown', 'center').click({release:false}).trigger('mouseup',5,5).trigger('mouseleave');
            }
        })

    }

    checkFinalStepForms() : void{
        cy.get(this.boxSelector).then(($box) => {
            const checkSaveButtonExist= $box.text().includes('Save');
            if (checkSaveButtonExist) {
                cy.contains('Continue').click({force:true})
                    .then(() => this.checkFinalStepForms())
            }
            })

    }

    chooseRandomDateFormsCalendar() : void {
        cy.get(this.calendarPeriodSelector).click()
        cy.get(this.calendarArrowSelector).click()
        cy.get(this.yearTabSelector).eq(Math.floor(Math.random() * 22)+1).click()
    }

    selectCompleteFormsAndCompleteMedicalInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        //cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait(800).get('.select-box').eq(1).within(() =>
            cy.get('.edit-col').eq(4).click({force:true}))


        //Check medications slider is set to on; if not, proceed
        cy.get('#switch-showMedication').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check vitamins and supplements slider is set to on; if not, proceed
        cy.get('#switch-showVitamins').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check alergies slider is set to on; if not, proceed
        cy.get('#switch-showAllergies').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        //Check medical devices slider is set to on; if not, proceed
        cy.get('#switch-showMedicalDevices').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        this.completeField('Medication Name', 'Medication Name Test Field')
        this.completeField('Dosage', '1550mg')
        this.completeField('Frequency / Duration', 'twice a day for 10 weeks')

        cy.get(this.iconCalendarSelector).eq(1).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(2).click()
        this.chooseRandomDateFormsCalendar()

        this.completeField('Vitamin/Supplement Name', 'Vitamina D')
        this.completeField('Dosage', '1000mg')
        this.completeField('Frequency / Duration', 'at 4 days')
        this.completeField('Vitamin/Supplement Name', 'Vitamina D')

        cy.get(this.iconCalendarSelector).eq(3).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(4).click()
        this.chooseRandomDateFormsCalendar()

        this.completeField('Allergy', 'Butter')
        this.completeField('Reaction', 'Headache')


        cy.get(this.iconCalendarSelector).eq(5).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(6).click()
        this.chooseRandomDateFormsCalendar()

        cy.get('input[placeholder="Device-placeholder"]').clear().type("EKG");

        cy.get(this.iconCalendarSelector).eq(7).click()
        this.chooseRandomDateFormsCalendar()

        cy.get(this.iconCalendarSelector).eq(8).click()
        this.chooseRandomDateFormsCalendar()

        cy.wait(400).contains('Save').click()
    }

    selectCompleteFormsAndCompleteAdditionalInformation() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        cy.get(this.burgerMenuSelector).click({force:true});

        cy.wait(300).get('.select-box').eq(1).within(() =>
            cy.get('.edit-col').eq(5).click({force:true}))

        cy.get('#switch-hadAccupunctureBefore').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        cy.get('#switch-hadChineseHerbalMedicineBefore').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        cy.get('#switch-currentlySeeingMD').then(($ele) => {
            if (!$ele.is(':checked')) {
                cy.wrap($ele).check({force:true})
            }
        })

        this.completeField('Is there anything else you want to mention?', 'Test Message')
        this.completeField('What condition is your MD treating?', 'Test treating message')
        this.completeField('Therapy prescribed', 'Test second treating message')

        cy.contains('Save').click()
    }


    selectCompleteFormsAndCompleteScreeningForms() : void {
        cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Appointments?Direction=*').as('forms')
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait('@forms')
        cy.contains('Forms').click({force:true})
        cy.get(this.burgerMenuSelector).click({force:true});
        cy.wait(1100).get('.select-box').last().within(() =>
            cy.get('.edit-col').eq(7).click({force: true})
        )
        cy.contains('Complete Forms').click()
        this.completeField('New Input', 'Test Message for Screening')

        this.checkSaveContinueVisibility()
    }

    checkSaveContinueVisibility(): void {
        cy.wait(500)
        cy.get('.pp-container').then($button => {
            if($button.text().includes('Save & Continue')) {
                cy.intercept('https://pp.api.staging.unifiedpractice.com/t/automation-cypress/Onboarding/medicalforms/*').as('upcomingscreening')
                cy.contains('Save & Continue').click()
                    cy.wait('@upcomingscreening')
                    .then(() => this.checkSaveContinueVisibility())
            }
        })
    }


    //STEP THAT HELPS TO DETERMINE THE EVOLUTION OF FORM COMPLETION; USEFUL FOR SCREENING FORMS
    checkFinalFormsWindow(): void {
        cy.get(this.boxSelector).then($box => {
            const finalStep = $box.text().includes('Thank you!')
            if (finalStep) {
                cy.get('.row-md-radio').children().contains('Automation Location').click({force:true});
            }
        })
    }

    // LIVE CHAT METHODS

    checkChatVisibility(): void{
        cy.get(this.burgerMenuSelector).click().wait(500);
        cy.wait(300).get('.mat-menu-content').within(() =>
            cy.contains('Chat').should('be.visible') )
    }

    openChat(): void{
        cy.get(this.burgerMenuSelector).click().wait(1500);
        cy.wait(300).get('.mat-menu-content').within(() =>
            cy.contains('Chat').click().wait(1500) )
    }

    openChatwithPractitioner(): void{
        cy.wait(300).get(this.headerChatSelector).within(() =>
            cy.get(this.iconSelector).click() )
        cy.contains('Chat with your practitioner').click()
    }

    checkMessageInEHR():void{
        cy.wait(3500).get('.mat-button-base').click().wait(1500);
        cy.get('.text-ellipsis').eq(0).click();
        cy.contains('generated to verify that the message was sent to the EHR:' + getDayMonthHour).should('be.visible');
    }

    openChatwithFrontdesk(): void{
        cy.wait(300).get(this.headerChatSelector).within(() =>
            cy.get(this.iconSelector).click() )
        cy.contains('Chat with front desk').click()
    }

    sendMessageToPractitioner(): void{
        cy.get('.rta').click().type('This is a message sent by the automation software. The next time will be automatically generated to verify that the message was sent to the EHR: ' + getDayMonthHour).trigger('keydown', {
            key: 'Enter',
        })
    }

    selectPatientFromLiveChat(): void{
        cy.get()
    }

    uploadImageinLiveChat(): void{
        cy.wait(2500).get('input[type=file]').selectFile('cypress/fixtures/images/imageforupload.png', { force: true })
        cy.wait(1500).get('.str-chat__send-button').click()
    }



}

export default PatientPortal
