import { NextApiRequest, NextApiResponse } from "next";
import { getAllCompaniesController } from "../../controllers/getAllCompaniesController/getAllCompaniesController";
import { getAllCompaniesService } from "../../services/getAllCompaniesService/getAllCompaniesService";

jest.mock("../../services/getAllCompaniesService/getAllCompaniesService");

describe("getAllCompaniesController", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 200 and companies data", async () => {
    const companies = [
      {
        id: "1",
        name: "Company 1",
        stock_ticker: "CMP1",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://company1.com",
        user_id: "user1",
      },
    ];
    (getAllCompaniesService as jest.Mock).mockResolvedValue(companies);

    await getAllCompaniesController(
      req as NextApiRequest,
      res as NextApiResponse
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(companies);
  });

  it("should return 500 on error", async () => {
    (getAllCompaniesService as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await getAllCompaniesController(
      req as NextApiRequest,
      res as NextApiResponse
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });
});
