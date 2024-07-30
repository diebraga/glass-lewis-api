import { createMocks } from "node-mocks-http";
import { updateCompanyService } from "../../services/updateCompanyService/updateCompanyService";
import { updateCompanyController } from "./updateCompanyController";

jest.mock("../../services/updateCompanyService/updateCompanyService");

describe("updateCompanyController", () => {
  it("should return 405 if method is not PUT", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await updateCompanyController(req as any, res as any);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 409 if company with the same ISIN already exists", async () => {
    (updateCompanyService as jest.Mock).mockRejectedValue(
      new Error("Company with this ISIN already exists!")
    );

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      },
    });

    await updateCompanyController(req as any, res as any);

    expect(res._getStatusCode()).toBe(409);
    expect(res._getJSONData()).toEqual({
      error: "Company with this ISIN already exists!",
    });
  });

  it("should return 404 if company is not found", async () => {
    (updateCompanyService as jest.Mock).mockRejectedValue(
      new Error("Company not found!")
    );

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      },
    });

    await updateCompanyController(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({
      error: "Company not found!",
    });
  });

  it("should return 200 and the updated company if the update is successful", async () => {
    const mockUpdatedCompany = {
      id: 1,
      name: "Updated Company",
      stock_ticker: "UC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://updatedcompany.com",
    };

    (updateCompanyService as jest.Mock).mockResolvedValue(mockUpdatedCompany);

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      },
    });

    await updateCompanyController(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockUpdatedCompany);
  });

  it("should return 500 on internal server error", async () => {
    (updateCompanyService as jest.Mock).mockRejectedValue(
      new Error("Internal server error")
    );

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      },
    });

    await updateCompanyController(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: "Internal server error",
    });
  });
});
