import { getCompanyByIsinService } from "../../services/getCompanyByIsinService/getCompanyByIsinService";
import pool from "../../lib/db";

jest.mock("../../lib/db", () => ({
  query: jest.fn(),
}));

describe("getCompanyByIsinService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if ISIN is not provided", async () => {
    await expect(getCompanyByIsinService(null as any)).rejects.toThrow(
      "ISIN must be provided!"
    );
  });

  it("should throw an error if company is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await expect(getCompanyByIsinService("123")).rejects.toThrow(
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

    const result = await getCompanyByIsinService("US1234567890");

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
