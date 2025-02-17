import LoginPage from "../../../cypress/pageObjects/login.page";
import Api,{HttpStatusCode} from "../../support/api";

describe("Login page tests", () => {
  before(function () {
    cy.fixture("users").as("usersData");
  });

  beforeEach(function () {
    LoginPage.loadLoginPage();
    LoginPage.interceptAuthentication();
  });

  // not happy flow
  it("should not login with invalid credentials", function () {
    LoginPage.login(
      this.usersData.invalidUser1.userName,
      this.usersData.invalidUser1.password
    );
    this.validateWaitResponseStatusCode(`@${LoginPage.InterceptionRequestName}`,HttpStatusCode.UNAUTHORIZED);
  });

  //happy flow
  it("should login with valid credentials", function () {
    LoginPage.login();
    this.validateWaitResponseStatusCode(`@${LoginPage.InterceptionRequestName}`,HttpStatusCode.OK);
  });
});
