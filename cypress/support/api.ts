export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum HttpStatusCode {
  OK = 200,
  UNAUTHORIZED = 401,
}

export default class Api {
  public static readonly HttpMethod = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE",
  }
  
  public static interceptRequest(
    method: HttpMethod,
    url: string | RegExp,
    alias: string
  ) {
    cy.intercept(method, url).as(alias);
  }
}
