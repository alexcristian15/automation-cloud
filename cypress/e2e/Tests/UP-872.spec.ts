import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"


describe('Automation test for UP-872', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();

    // For retain session and prevent logout during testing - it's a must have in all tests for prevent logout
    //beforeEach(() => {
        //cy.session('ASP.NET_SessionId', 'sessionid', 'chatToken')
    //})
    // End beforeEach

    //Start login process. It calls Patient Portal class from PatientPortal file and
    // for more easiness that class is attributed to login const
    it("UP-872", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();

        navigate.extendMenu()
        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.forgotPassword();
    })

})
