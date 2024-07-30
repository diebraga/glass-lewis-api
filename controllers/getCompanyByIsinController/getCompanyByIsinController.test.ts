import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIsinController } from "../../controllers/getCompanyByIsinController/getCompanyByIsinController";
import { getCompanyByIsinService } from "../../services/getCompanyByIsinService/getCompanyByIsinService";
import { createMocks } from "node-mocks-http";

jest.mock("../../services/getCompanyByIsinService/getCompanyByIsinService");

describe("getCompanyByIsinController", () => {
  it("should return 200 and company details if company is found", async () => {
    const mockCompany = {
      id: 1,
      name: "Test Company",
      stock_ticker: "TC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://testcompany.com",
      user_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    (getCompanyByIsinService as jest.Mock).mockResolvedValueOnce(mockCompany);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();
    req.query = { isin: "US1234567890" };

    await getCompanyByIsinController(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockCompany);
  });

  it("should return 404 if company is not found", async () => {
    (getCompanyByIsinService as jest.Mock).mockRejectedValueOnce(new Error("Company not found!"));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();
    req.query = { isin: "US1234567890" };

    await getCompanyByIsinController(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ error: "Company not found!" });
  });

  it("should return 400 if ISIN is not provided", async () => {
    (getCompanyByIsinService as jest.Mock).mockRejectedValueOnce(new Error("ISIN must be provided!"));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();
    req.query = { isin: "" };

    await getCompanyByIsinController(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ error: "ISIN must be provided!" });
  });

  it("should return 500 on internal server error", async () => {
    (getCompanyByIsinService as jest.Mock).mockRejectedValueOnce(new Error("Internal server error"));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();
    req.query = { isin: "US1234567890" };

    await getCompanyByIsinController(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: "Internal server error" });
  });
});