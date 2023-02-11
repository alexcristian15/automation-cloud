import LoginPage from "../PageObject/login-page"
import PatientPortal from "../PageObject/patient-portal";
import SideBarNavigate from "../PageObject/side-bar-menu";
import ClinicServices from "../PageObject/clinic-settings/clinic-services";
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff";
import DrawerModal from "../PageObject/drawer-modal";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";
import BasePage from "../PageObject/base-page";

describe('Automation test for UP-856', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();
    const drawerModal = new DrawerModal();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();


    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-856", function () {

        login.goToStaging();
        login.loginAutomation();
        //THE TEST IS FOLLOWING AN OLD FLOW STRUCTURE FOR CREATING A NEW ACCOUNT;
        //THERE IS NO LONGER THE OPTION TO CHOOSE INSURANCE

        navigate.extendMenu();

        navigate.selectCS('Locations')
        clinicLocations.editLocation(0);
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Clinic Staff')
        clinicStaff.markUserActive('Automation Engineer')
        clinicStaff.markUserActive('Automation Another')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.saveButton();

        navigate.extendMenu()

        navigate.selectCS('Clinic Services')
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Tests')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Engineer')
        clinicServices.clickOnDropdownUnmarkedPractitioners('Automation Another')
        clinicServices.clickOnDropdownUnmarkedRooms('Room 1')
        drawerModal.saveButton();
        pp.shouldBeVisible('Clinic service saved')

        navigate.selectCS('Clinic Staff')
        clinicStaff.clickOnDetails('Automation Engineer')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.saveButton();

        navigate.selectPP();
        pp.setToOn('Allow patients to book appointments online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.createAccountProceed();

    })

})
