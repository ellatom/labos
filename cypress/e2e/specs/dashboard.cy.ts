import DashboardPage from "../../pageObjects/dashboard.page";
import LoginPage from "../../pageObjects/login.page";

describe("Dashboard page tests", () => {
  beforeEach(() => {
    // cy.login(); // TBD Uses cached session if available
    LoginPage.loadLoginPage();
    LoginPage.interceptAuthentication();
    LoginPage.login();
  });

  it("should navigate from dashboard to order page successfully", () => {
    DashboardPage.navigateToOrderScreen();
  });
});
