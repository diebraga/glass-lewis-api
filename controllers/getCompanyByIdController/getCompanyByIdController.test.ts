import { getCompanyByIdService } from "../../services/getCompanyByIdService/getCompanyByIdService";
import pool from "../../lib/db";

jest.mock("../../lib/db", () => ({
  query: jest.fn(),
}));

describe("getCompanyByIdService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if companyId is not provided", async () => {
    await expect(getCompanyByIdService(null as any)).rejects.toThrow(
      "Company ID must be provided!"
    );
  });

  it("should throw an error if company is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await expect(getCompanyByIdService(1)).rejects.toThrow(
      "Company not found!"
    );
  });

  it("should return company details if company is found", async () => {
    const mockCompany = {
      id: 1,
      name: "Test Company",
      stock_ticker: "TC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://testcompany.com",
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockCompany] });

    const result = await getCompanyByIdService(1);

    expect(result).toEqual({
      id: mockCompany.id,
      name: mockCompany.name,
      stock_ticker: mockCompany.stock_ticker,
      exchange: mockCompany.exchange,
      isin: mockCompany.isin,
      website_url: mockCompany.website_url,
      user_id: mockCompany.user_id,
      created_at: mockCompany.created_at,
      updated_at: mockCompany.updated_at,
    });
  });
});
