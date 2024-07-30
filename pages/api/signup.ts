import { NextApiRequest, NextApiResponse } from "next";
import { signUpUserController } from "@/controllers/signUpUserController/signUpUserController";

export type SignInResData = {
  token?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResData>
) => await signUpUserController(req, res);

export default handler;
