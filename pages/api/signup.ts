import { NextApiRequest, NextApiResponse } from "next";
import { signUpUserController } from "@/controllers/signUpUserController/signUpUserController";
import { cors, runCorsMiddleware } from "@/middleware/cors";

export type SignInResData = {
  token?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResData>
) => {
  await runCorsMiddleware(req, res, cors);
  await signUpUserController(req, res);
};

export default handler;
