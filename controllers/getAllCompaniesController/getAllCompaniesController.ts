import { getAllCompaniesService } from "../../services/getAllCompaniesService/getAllCompaniesService";
import { NextApiRequest, NextApiResponse } from "next";

export const getAllCompaniesController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const companies = await getAllCompaniesService();
    return res.status(200).json(companies);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
