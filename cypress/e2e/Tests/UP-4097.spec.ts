import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import DrawerModal from "../PageObject/drawer-modal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import sideBarMenu from "../PageObject/side-bar-menu";


describe('Automation test for UP-4097', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const drawerModal = new DrawerModal();
    const clinicServices = new ClinicServices();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-4097", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online');
        pp.saveButton();

        pp.openPP();
        pp.checkLogin();
        pp.shouldBeVisible('Create an Account to Book an Appointment')

        pp.backtoEHR();

        navigate.extendMenu();
        navigate.selectPP();
        pp.setToOff('Allow patients to book appointments online');
        pp.saveButton();

        pp.openPP();
        pp.checkLogin();
        pp.shouldBeVisible('Create an Account to Access Your File')

        //Clear
        pp.backtoEHR();

        navigate.extendMenu();
        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.saveButton();


    })

})
