import { createCompanyService } from "./createCompanyService";
import pool from "../../lib/db";

jest.mock("../../lib/db");

describe("createCompanyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if user is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    await expect(
      createCompanyService({
        userId: "non-existing-user-id",
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      })
    ).rejects.toThrow("User not found!");
  });

  it("should throw an error if user is not an admin", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ isadmin: false }],
    });

    await expect(
      createCompanyService({
        userId: "non-admin-user-id",
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      })
    ).rejects.toThrow("Only admins can create a company!");
  });

  it("should throw an error if ISIN is invalid", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ isadmin: true }],
    });

    await expect(
      createCompanyService({
        userId: "admin-user-id",
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "1234567890",
        website_url: "https://test.com",
      })
    ).rejects.toThrow("ISIN must start with two letters!");
  });

  it("should throw an error if company with ISIN already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ isadmin: true }],
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{}] });

    await expect(
      createCompanyService({
        userId: "admin-user-id",
        name: "Test Company",
        stock_ticker: "TST",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://test.com",
      })
    ).rejects.toThrow("Company with this ISIN already exists!");
  });

  it("should return company details if request is valid", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ isadmin: true }],
    });
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: "1",
          name: "Test Company",
          stock_ticker: "TST",
          exchange: "NASDAQ",
          isin: "US1234567890",
          website_url: "https://test.com",
          user_id: "admin-user-id",
        },
      ],
    });

    const result = await createCompanyService({
      userId: "admin-user-id",
      name: "Test Company",
      stock_ticker: "TST",
      exchange: "NASDAQ",
      isin: "US1234567890",
      website_url: "https://test.com",
    });

    expect(result).toEqual({
      id: "1",
      name: "Test Company",
      stock_ticker: "TST",
      exchange: "NASDAQ",
      isin: "US1234567890",
      website_url: "https://test.com",
      user_id: "admin-user-id",
    });
  });
});
