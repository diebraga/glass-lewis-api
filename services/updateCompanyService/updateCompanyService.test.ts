import { updateCompanyService } from "../../services/updateCompanyService/updateCompanyService";
import pool from "../../lib/db";

jest.mock("../../lib/db");

describe("updateCompanyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if company with the same ISIN already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 2 }],
    });

    await expect(
      updateCompanyService({
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      })
    ).rejects.toThrow("Company with this ISIN already exists!");
  });

  it("should throw an error if company is not found", async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });

    await expect(
      updateCompanyService({
        companyId: 1,
        name: "Updated Company",
        stock_ticker: "UC",
        exchange: "NYSE",
        isin: "US1234567890",
        website_url: "https://updatedcompany.com",
      })
    ).rejects.toThrow("Company not found!");
  });

  it("should update the company successfully", async () => {
    const mockUpdatedCompany = {
      id: 1,
      name: "Updated Company",
      stock_ticker: "UC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://updatedcompany.com",
    };

    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [mockUpdatedCompany] });

    const result = await updateCompanyService({
      companyId: 1,
      name: "Updated Company",
      stock_ticker: "UC",
      exchange: "NYSE",
      isin: "US1234567890",
      website_url: "https://updatedcompany.com",
    });

    expect(result).toEqual(mockUpdatedCompany);
  });
});
