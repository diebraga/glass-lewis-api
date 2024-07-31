import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { updateCompanyController } from "@/controllers/updateCompanyController.ts/updateCompanyController";
import { cors, runCorsMiddleware } from "@/middleware/cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, cors);
  await updateCompanyController(req, res);
};

export default ensureIsAuthenticated(handler);
