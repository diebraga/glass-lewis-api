import { NextApiRequest, NextApiResponse } from "next";
import * as createCompanyServiceModule from "../../services/createCompanyService/createCompanyService";
import { createMocks } from "node-mocks-http";
import { createCompanyController } from "./createCompanyController";

jest.mock("../../services/createCompanyService/createCompanyService");

describe("createCompanyController", () => {
  it("should return 405 if method is not POST", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 404 if user is not found", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "invalid-user-id";

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockRejectedValue(new Error("User not found!"));

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ error: "User not found!" });
  });

  it("should return 403 if user is not an admin", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "non-admin-user-id";

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockRejectedValue(new Error("Only admins can create a company!"));

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(res._getJSONData()).toEqual({
      error: "Only admins can create a company!",
    });
  });

  it("should return 400 if ISIN is invalid", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "admin-user-id";

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockRejectedValue(new Error("ISIN must start with two letters!"));

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: "ISIN must start with two letters!",
    });
  });

  it("should return 409 if company with ISIN already exists", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "admin-user-id";

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockRejectedValue(new Error("Company with this ISIN already exists!"));

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(409);
    expect(res._getJSONData()).toEqual({
      error: "Company with this ISIN already exists!",
    });
  });

  it("should return 200 and company details if request is valid", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "admin-user-id";

    const companyData = {
      id: "1",
      name: "Test Company",
      stock_ticker: "TST",
      exchange: "NASDAQ",
      isin: "US1234567890",
      website_url: "https://test.com",
      user_id: "admin-user-id",
    };

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockResolvedValue(companyData);

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(companyData);
  });

  it("should return 500 for internal server error", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      },
    });
    // @ts-ignore
    req.user_id = "admin-user-id";

    jest
      .spyOn(createCompanyServiceModule, "createCompanyService")
      .mockRejectedValue(new Error("Internal server error"));

    await createCompanyController(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ error: "Internal server error" });
  });
});
