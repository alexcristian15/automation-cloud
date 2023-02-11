import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicServices from "../PageObject/clinic-settings/clinic-services"
import ClinicStaff from "../PageObject/clinic-settings/clinic-staff"
import basePage from "../PageObject/base-page";
import drawerModal from "../PageObject/drawer-modal";
import DrawerModal from "../PageObject/drawer-modal";
import patientPortal from "../PageObject/patient-portal";
import BasePage from "../PageObject/base-page";
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations";
import PatientList from "../PageObject/patient-list";
import {getDayMonthHour} from "../PageObject/patient-list";

describe('Automation test for UP-904', () => {
    const login = new LoginPage();
    const patientList = new PatientList();
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
    it("UP-904", function () {

        login.goToStaging();
        login.loginAutomation();

        //Check for logout from PP to avoid error
        navigate.extendMenu();

        navigate.selectPP()
        pp.setToOn('Allow patients to book appointments online')
        pp.setToOn('Allow patient to cancel or reschedule an appointment online')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        //End checking for logout to avoid error

        pp.backtoEHR()
        navigate.extendMenu()

        navigate.selectAllClinicPatients();
        patientList.addNewPatient();
        patientList.searchPatient('Automation'+getDayMonthHour);
        patientList.sendInviteForPP();
        patientList.validateNewPPAccountEmail();
    })

})
