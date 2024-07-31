import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { updateCompanyController } from "@/controllers/updateCompanyController.ts/updateCompanyController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureIsAuthenticated(req, res, updateCompanyController);
};

export default handler;
