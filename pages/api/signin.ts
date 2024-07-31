import { NextApiRequest, NextApiResponse } from "next";
import { signInController } from "@/controllers/signInController/signInController";
import { runCorsMiddleware, cors } from "@/middleware/cors";

export type SignInResData = {
  token?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResData>
) => {
  await runCorsMiddleware(req, res, cors);
  await signInController(req, res);
};

export default handler;
