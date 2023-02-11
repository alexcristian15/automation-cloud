import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"

describe('Automation test for UP-831', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicStaff = new ClinicStaff();
    const clinicServices = new ClinicServices();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-831", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.markUserActive('Automation Engineer')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicServices.checkBoxSliderSetOff('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.saveButton();

        navigate.extendMenu();
        navigate.selectPP();
        pp.openPP();

        pp.checkLogin();
        pp.selectRadio(1);
        pp.selectLocation('Automation Location')
        pp.selectService('Automation with CCPE')
        pp.shouldNotBeVisible('Automation Engineer')

        //Cleaning
        pp.backtoEHR();
        navigate.extendMenu();
        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicServices.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.saveButton();
         })

})
