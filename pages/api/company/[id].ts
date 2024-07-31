import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIdController } from "../../../controllers/getCompanyByIdController/getCompanyByIdController";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureIsAuthenticated(req, res, getCompanyByIdController);
};

export default handler;
