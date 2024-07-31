import { NextApiRequest, NextApiResponse } from "next";
import { getCompanyByIdController } from "../../../controllers/getCompanyByIdController/getCompanyByIdController";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { cors, runCorsMiddleware } from "@/middleware/cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, cors);
  await getCompanyByIdController(req, res);
};

export default ensureIsAuthenticated(handler);
