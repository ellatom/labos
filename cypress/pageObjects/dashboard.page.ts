import Api, { HttpMethod } from "../support/api.ts";
import { DashboardEndpoints } from "../support/endpoints/dashboardEndpoints.ts";
import Page from "./page.ts";

class DashboardPage extends Page {
  private readonly SearchKeyOrder: string = "Order";
  private readonly OrderRequest: string = "OrderRequest";

  private get menuButton(): string {
    return "button[data-cy='st-button-menu']";
  }

  private get menuSearchInput(): string {
    return "input[id='menuSearchInput']";
  }
  private get subItemBtnOrder(): string {
    return "a[id='st-navbar-sub-item-button-order']";
  }

  private selectOrderMenuList() {
    Api.interceptRequest(
      HttpMethod.GET,
      DashboardEndpoints.ORDER_INTERCEPT_URL,
      this.OrderRequest
    );
    this.clickOnButton(this.subItemBtnOrder);
  }

  public navigateToOrderScreen() {
    this.clickOnButton(this.menuButton);
    this.typeIntoField(this.menuSearchInput, this.SearchKeyOrder);
    this.selectOrderMenuList();
    this.waitRequestComplete(`@${this.OrderRequest}`);
  }
}

export default new DashboardPage();
