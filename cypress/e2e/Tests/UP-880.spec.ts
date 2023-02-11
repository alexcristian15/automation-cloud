import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import PatientList from "../PageObject/patient-list";

describe('Automation test for UP-880', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-880", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.selectCompleteFormsAndCompleteMedicalInformation()

    })

})
