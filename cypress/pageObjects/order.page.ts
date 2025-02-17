import ActionTypes from "../support/actionTypes.ts";
import Api, { HttpMethod } from "../support/api.ts";
import AssertionTypes from "../support/assertions.ts";
import { OrderEndpoints } from "../support/endpoints/orderEndpoints.ts";
import Page from "./page.ts";

interface OrderData {
  qaFacilityKey: string;
  qaFacilityAutoComplitionId: string;
  physicianAutoInsert: string;
  patientById: string;
  patientByAutoComplitionId: string;
}

class OrderPage extends Page {
  private readonly AlbuminToolTip: string = "SST";
  private readonly ToastResponse: string = "toastResponse";

  private get facilityField(): string {
    return "input[id='mat-input-5']";
  }

  private get physicianField(): string {
    return "input[id='mat-input-6']";
  }

  private get patientByField(): string {
    return "input[id='mat-input-7']";
  }

  private get albTestOption(): string {
    return "form > div.st-test-item.ng-star-inserted";
  }

  private get qaFacilitySearchFirstOption(): string {
    return "div[id='mat-autocomplete-4']";
  }

  private get patientBySearchFirstOption(): string {
    return "div[id='mat-autocomplete-6']";
  }

  private get starIcon(): string {
    return ".st-mr-1.ng-star-inserted";
  }

  private get tooltipStar() {
    return "div[id='st-tooltip']";
  }

  private get albuminCheckbox() {
    return "input[id='mat-mdc-checkbox-1-input']";
  }

  private get saveOrderButton() {
    return "button[id='st-button-save']";
  }

  private get toastMessage() {
    return "div[class='st-font-18 st-bold st-ellipsis st-tooltip-trigger ng-star-inserted']";
  }

  private validateRequiredFieldsEmpty() {
    const requiredFields = [
      this.facilityField,
      this.physicianField,
      this.patientByField,
    ];

    requiredFields.forEach((field) => this.validateEmptyField(field));
  }

  //this field can accept any search key
  public insertQaFacilityKey(searchKeyOrder: string) {
    this.typeIntoField(this.facilityField, searchKeyOrder);
  }

  public selectAutoCompleteFirstOption(autoCompleteItem: string) {
    this.clickOnButton(autoCompleteItem);
  }

  public validateAutoInsertPhysicianField(physicianAutoInsert: string) {
    this.getElement(this.physicianField).should(
      AssertionTypes.HAVE_VALUE,
      physicianAutoInsert
    );
  }
  //this field can accept any search key
  public insertPatientBy(patientBy: string) {
    this.typeIntoField(this.patientByField, patientBy);
  }

  public autoInsertPhysician(
    physicianAutoInsert: string,
    qaAutoComplitionId: string
  ) {
    this.selectAutoCompleteFirstOption(qaAutoComplitionId); //TBD make sure the correct option choosen
    this.validateAutoInsertPhysicianField(physicianAutoInsert);
  }

  public createOrder(orderData: OrderData) {
    let {
      qaFacilityKey = "",
      qaFacilityAutoComplitionId = "",
      physicianAutoInsert = "",
      patientById = "",
      patientByAutoComplitionId = "",
    } = orderData;

    let isFieldsFilled = this.validateMandatoryFieldsFilled(
      qaFacilityKey,
      physicianAutoInsert,
      patientById
    );

    if (!isFieldsFilled) return;

    this.fillOrderDetails(orderData);
    this.validateTooltipTxtOnHover(
      this.starIcon,
      this.tooltipStar,
      this.AlbuminToolTip
    );
    this.checkCheckbox(this.albuminCheckbox);
    this.validateTestAddedToList();
  }

  public fillOrderDetails(orderData: OrderData) {
    const {
      qaFacilityKey,
      qaFacilityAutoComplitionId,
      physicianAutoInsert,
      patientById,
      patientByAutoComplitionId,
    } = orderData;

    this.insertQaFacilityKey(qaFacilityKey);
    this.autoInsertPhysician(physicianAutoInsert, qaFacilityAutoComplitionId);
    this.insertPatientBy(patientById);
    this.selectAutoCompleteFirstOption(patientByAutoComplitionId);
  }

  public validateTooltipTxtOnHover(
    hoverSelector: string,
    tooltipSelector: string,
    expectedTooltipTxt: string
  ) {
    this.getTooltipTxtOnHover(hoverSelector, tooltipSelector)
      .should(AssertionTypes.EXIST)
      .and(AssertionTypes.HAVE_TEXT, expectedTooltipTxt);
  }

  public validateTestAddedToList() {
    this.validateElementExistAndVisible(this.albTestOption);
  }

  public saveOrder() {
    this.clickOnButton(this.saveOrderButton);
    this.validateRequiredFieldsEmpty();
  }

  public validateToastMessageWithValidDetails() {
    Api.interceptRequest(
      HttpMethod.POST,
      OrderEndpoints.POST_ORDER,
      this.ToastResponse
    );

    this.getElement(this.toastMessage)
      .trigger(ActionTypes.MOUSEOVER)
      .should(AssertionTypes.BE_VISIBLE)
      .invoke(ActionTypes.TEXT)
      .then((text) => {
        expect(text).to.include(this.extractOrderNameFromResponse());
      });
  }

  public validateMandatoryFieldsFilled(
    qaFacilityKey: string,
    physicianAutoInsert: string,
    patientById: string
  ): boolean {
    return !(
      qaFacilityKey === "" &&
      physicianAutoInsert === "" &&
      patientById === ""
    );

    //TBD
    // this.validateErrorBorder(
    //   "div[ class='mdc-line-ripple ng-tns-c3736059725-15 ng-star-inserted'] "
    // );
  }

  public extractOrderNameFromResponse() {
    let orderName = "";

    cy.wait(`@${this.ToastResponse}`).then((interception) => {
      orderName = interception.response?.body?.order.orderName;
      cy.log(`OrderName:${orderName}`);
    });
    return orderName;
  }
}

export default new OrderPage();
