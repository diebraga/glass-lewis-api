import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { createCompanyController } from "@/controllers/createCompanyController/createCompanyController";

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  await createCompanyController(req, res);

export default ensureIsAuthenticated(handler);
