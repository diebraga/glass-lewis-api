import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { getCompanyByIsinController } from "@/controllers/getCompanyByIsinController/getCompanyByIsinController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureIsAuthenticated(req, res, getCompanyByIsinController);
};

export default handler;
