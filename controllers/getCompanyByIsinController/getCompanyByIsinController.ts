import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIsinService } from "../../services/getCompanyByIsinService/getCompanyByIsinService";

export const getCompanyByIsinController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { isin } = req.query;

  const service = getCompanyByIsinService;

  try {
    const result = await service(isin as string);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Company not found!") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "ISIN must be provided!") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
