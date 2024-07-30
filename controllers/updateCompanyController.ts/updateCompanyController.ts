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
    console.log(
      "Controller: Received update request for company ID:",
      companyId
    );

    const result = await updateCompanyService({
      companyId,
      name,
      stock_ticker,
      exchange,
      isin,
      website_url,
    });

    console.log("Controller: Update successful");
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Controller: Error updating company:", error.message);

    if (error.message === "Company not found!") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "Company with this ISIN already exists!") {
      return res.status(409).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
