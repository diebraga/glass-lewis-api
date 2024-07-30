import { getAllCompaniesController } from "@/controllers/getAllCompaniesController/getAllCompaniesController";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  await getAllCompaniesController(req, res);

export default ensureIsAuthenticated(handler);
