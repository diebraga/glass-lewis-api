import { NextApiRequest, NextApiResponse } from "next";
import { signInController } from "@/controllers/signInController/signInController";

export type SignInResData = {
  token?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResData>
) => await signInController(req, res);


export default handler;
