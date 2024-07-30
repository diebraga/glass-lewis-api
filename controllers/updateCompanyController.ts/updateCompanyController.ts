import { NextApiRequest, NextApiResponse } from "next";
import { updateCompanyService } from "../../services/updateCompanyService/updateCompanyService";

export const updateCompanyController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { companyId, name, stock_ticker, exchange, isin, website_url } =
    req.body;

  try {

    const result = await updateCompanyService({
      companyId,
      name,
      stock_ticker,
      exchange,
      isin,
      website_url,
    });

    return res.status(200).json(result);
  } catch (error: any) {

    if (error.message === "Company not found!") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "Company with this ISIN already exists!") {
      return res.status(409).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
