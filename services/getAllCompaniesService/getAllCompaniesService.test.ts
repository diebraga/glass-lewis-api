import pool from "../../lib/db";
import { getAllCompaniesService } from "../../services/getAllCompaniesService/getAllCompaniesService";

jest.mock("../../lib/db", () => ({
  query: jest.fn(),
}));

describe("getAllCompaniesService", () => {
  it("should return a list of companies", async () => {
    const mockCompanies = [
      {
        id: "1",
        name: "Company 1",
        stock_ticker: "CMP1",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://company1.com",
        user_id: "user1",
      },
      {
        id: "2",
        name: "Company 2",
        stock_ticker: "CMP2",
        exchange: "NYSE",
        isin: "US0987654321",
        website_url: "https://company2.com",
        user_id: "user2",
      },
    ];

    (pool.query as jest.Mock).mockResolvedValue({ rows: mockCompanies });

    const companies = await getAllCompaniesService();

    expect(companies).toEqual(mockCompanies);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM companies");
  });

  it("should throw an error if the query fails", async () => {
    const errorMessage = "Database error";
    (pool.query as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getAllCompaniesService()).rejects.toThrow(errorMessage);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM companies");
  });
});
