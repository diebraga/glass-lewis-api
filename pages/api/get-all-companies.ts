import { getAllCompaniesController } from "@/controllers/getAllCompaniesController/getAllCompaniesController";
import { cors, runCorsMiddleware } from "@/middleware/cors";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, cors);
  await getAllCompaniesController(req, res);
};

export default ensureIsAuthenticated(handler);
