import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations"
import BasePage from "../PageObject/base-page"


describe('Automation test for UP-905', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();


    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const

    it("UP-905", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();

        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        clinicLocations.saveButton();

        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.shouldBeVisible ('Automation Location')

    })
})
