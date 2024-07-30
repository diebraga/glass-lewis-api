import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIdService } from "../../services/getCompanyByIdService/getCompanyByIdService";

export const getCompanyByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Company ID must be provided!" });
  }

  try {
    const result = await getCompanyByIdService(Number(id));
    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Company not found!") {
      return res.status(404).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
