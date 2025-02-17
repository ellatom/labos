import ActionTypes from "../support/actionTypes";
import AssertionTypes from "../support/assertions";

export default class Page {
  private readonly BaseUrl = Cypress.config("baseUrl");
  private readonly BorderColorOnError = "rgb(255, 0, 0)";

  public visit(path: string) {
    cy.visit(`${this.BaseUrl}${path}`);
  }

  public getElement(selector: string) {
    return cy.get(selector);
  }

  public typeIntoField(selector: string, value: string) {
    this.validateElementExistAndVisible(selector).type(value);
  }

  public clickOnButton(selector: string) {
    this.validateElementExistAndVisible(selector);
    this.getElement(selector).click();
  }

  public waitRequestComplete(requestName: string) {
    cy.wait(requestName, { timeout: 100000 });
  }

  public validateElementExistAndVisible(selector: string) {
    return this.validateElementExist(selector).should(AssertionTypes.BE_VISIBLE);
  }

  public validateElementExist(selector: string) {
    return this.getElement(selector).should(AssertionTypes.EXIST);
  }

  public checkCheckbox(selector: string) {
    return this.getElement(selector).check().should(AssertionTypes.BE_CHECKED);
  }

  public getTooltipTxtOnHover(hoverSelector: string, tooltipSelector: string) {
    return this.getElement(hoverSelector)
      .trigger(ActionTypes.MOUSEOVER)
      .get(tooltipSelector);
  }

  public getElementTxt(element: Cypress.Chainable<JQuery<HTMLElement>>) {
    return element.invoke(ActionTypes.TEXT);
  }

  public validateErrorBorder(selector: string) {
    return this.getElement(selector).should(
      AssertionTypes.HAVE_CSS,
      AssertionTypes.BORDER_COLOR,
      this.BorderColorOnError
    );
  }

  public validateEmptyField(selector: string) {
    return this.getElement(selector).should(AssertionTypes.HAVE_VALUE, "");
  }

  public validateWaitResponseStatusCode(
    requestName: string,
    expectedResponse: number
  ) {
    return cy
      .wait(requestName)
      .its(AssertionTypes.STATUS_CODE)
      .should(AssertionTypes.EQUAL, expectedResponse);
  }
}
