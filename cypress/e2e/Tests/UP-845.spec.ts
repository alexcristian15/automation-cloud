import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import DrawerModal from "../PageObject/drawer-modal";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";
import BasePage from "../PageObject/base-page";


describe('Automation test for UP-845', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const drawerModal = new DrawerModal();
    const basePage = new BasePage();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    it("UP-845", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
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

        navigate.extendMenu();

        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.extendMenu();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        drawerModal.saveButton();

        navigate.extendMenu();

        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.textInBox('Minimum number of hours that an appointment can be scheduled into the future','24')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.bookNewAppointmentASAP();
        pp.checkRoundAvailabilities();
        pp.checkTodayToBeHidden()
    })

})
