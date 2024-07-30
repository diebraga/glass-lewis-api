import { NextApiRequest, NextApiResponse } from "next";
import { createCompanyService } from "../../services/createCompanyService/createCompanyService";

export const createCompanyController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, stock_ticker, exchange, isin, website_url } = req.body;

  try {
    const result = await createCompanyService({
      // @ts-ignore
      userId: req.user_id,
      name,
      stock_ticker,
      exchange,
      isin,
      website_url,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "User not found!") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "Only admins can create a company!") {
      return res.status(403).json({ error: error.message });
    } else if (error.message === "ISIN must start with two letters!") {
      return res.status(400).json({ error: error.message });
    } else if (error.message === "Company with this ISIN already exists!") {
      return res.status(409).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
