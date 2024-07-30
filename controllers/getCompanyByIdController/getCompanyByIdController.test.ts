import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIdController } from "../../controllers/getCompanyByIdController/getCompanyByIdController";
import { getCompanyByIdService } from "../../services/getCompanyByIdService/getCompanyByIdService";
import { createMocks } from "node-mocks-http";

jest.mock("../../services/getCompanyByIdService/getCompanyByIdService");

describe("getCompanyByIdController", () => {
  it("should return 200 and company details if company is found", async () => {
    const mockCompany = {
      id: 1,
      name: "Test Company",
      stock_ticker: "TC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://testcompany.com",
      user_id: 1,
      created_at: "2024-07-30T18:51:06.717Z",
      updated_at: "2024-07-30T18:51:06.717Z",
    };

    (getCompanyByIdService as jest.Mock).mockResolvedValue(mockCompany);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { id: "1" },
    });

    await getCompanyByIdController(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockCompany);
  });

  it("should return 400 if company ID is not provided", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {},
    });

    await getCompanyByIdController(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: "Company ID must be provided!",
    });
  });

  it("should return 404 if company is not found", async () => {
    (getCompanyByIdService as jest.Mock).mockRejectedValue(
      new Error("Company not found!")
    );

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { id: "999" },
    });

    await getCompanyByIdController(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ error: "Company not found!" });
  });

  it("should return 500 on internal server error", async () => {
    (getCompanyByIdService as jest.Mock).mockRejectedValue(
      new Error("Internal server error")
    );

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { id: "1" },
    });

    await getCompanyByIdController(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: "Internal server error",
    });
  });
});
