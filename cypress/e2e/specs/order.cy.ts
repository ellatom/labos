import OrderPage from "../../pageObjects/order.page";
import LoginPage from "../../pageObjects/login.page";
import DashboardPage from "../../pageObjects/dashboard.page";

describe("Order page tests", () => {

  before(function () {
    cy.fixture("orders").as("ordersData");
  });

  beforeEach(function () {
    LoginPage.loadLoginPage();
    LoginPage.interceptAuthentication();
    LoginPage.login();
  });

  it("should fill in order mandatory data with qa data, create and save it successfully", function () {
    DashboardPage.navigateToOrderScreen();
    OrderPage.createOrder(this.ordersData.qaOrder);
    OrderPage.saveOrder();
    OrderPage.validateToastMessageWithValidDetails();
  });

  it("should fail to save order when mandatory data not filled in", function () {
    DashboardPage.navigateToOrderScreen();
    OrderPage.createOrder(this.ordersData.emptyQaOrder);
    OrderPage.saveOrder();
  });
});
