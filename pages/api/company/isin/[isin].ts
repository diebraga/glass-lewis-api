import { NextApiRequest, NextApiResponse } from "next";
import { ensureIsAuthenticated } from "@/middleware/ensureIsAuthenticated";
import { getCompanyByIsinController } from "@/controllers/getCompanyByIsinController/getCompanyByIsinController";
import { cors, runCorsMiddleware } from "@/middleware/cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, cors);
  await getCompanyByIsinController(req, res);
};

export default ensureIsAuthenticated(handler);
