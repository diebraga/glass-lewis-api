import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { createCompanyController } from "@/controllers/createCompanyController/createCompanyController";
import { cors, runCorsMiddleware } from "@/middleware/cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, cors);
  await createCompanyController(req, res);
};

export default ensureIsAuthenticated(handler);
