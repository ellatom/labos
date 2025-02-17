import Api, { HttpMethod } from "../support/api.ts";
import { LoginEndpoints } from "../support/endpoints/loginEndpoints.ts";
import Page from "./page.ts";
import { LoginErrors } from "../support/errors/loginErrors.ts";

class LoginPage extends Page {
  
  private get userNameField(): string {
    return "input[formcontrolname='username']";
  }

  private get passwordField(): string {
    return "input[formcontrolname='password']";
  }

  private get loginButton(): string {
    return "button[id='st-button-login-enter']";
  }

  private get errorInvalidCredentials(): string {
    return "mat-error[id = 'mat-mdc-error-5']";
  }

  public readonly InterceptionRequestName = "loginRequest";

  public loadLoginPage() {
    super.visit(LoginEndpoints.PARTIAL_LOGIN_URL);
  }

  public login(
    userName: string = Cypress.env("USER_NAME"),
    password: string = Cypress.env("PASSWORD")
  ) {
    this.typeIntoField(this.userNameField, userName);
    this.typeIntoField(this.passwordField, password);
    this.clickOnButton(this.loginButton);
  }

  public interceptAuthentication() {
    Api.interceptRequest(
      HttpMethod.POST,
      LoginEndpoints.AUTH_URL,
      this.InterceptionRequestName
    );
  }

  public validateErrMsgOnInvalidCredentials() {
    this.getElementTxt(
      this.validateElementExistAndVisible(this.errorInvalidCredentials)
    ).then((text) => {
      expect(text.trim()).to.eq(LoginErrors.INVALID_CREDENTIALS_ERROR);
    });
  }
}

export default new LoginPage();
