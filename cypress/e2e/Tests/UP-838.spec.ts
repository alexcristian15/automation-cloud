import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import DrawerModal from "../PageObject/drawer-modal";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";
import BasePage from "../PageObject/base-page";


describe('Automation test for UP-838', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const drawerModal = new DrawerModal();
    const basePage = new BasePage();
    const clinicStaff = new ClinicStaff();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    it("UP-838", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.markUserActive('Automation Engineer')
        clinicStaff.clickOnDetails('Automation Tests');
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();
        navigate.extendMenu();
        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Engineer');
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.setToOff('Allow patient to cancel or reschedule an appointment online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointment();
        pp.shouldNotBeVisible('Reschedule');

    })

})
