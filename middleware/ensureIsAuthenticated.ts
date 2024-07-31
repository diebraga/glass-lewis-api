import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { cors, runCorsMiddleware } from "./cors";

export async function ensureIsAuthenticated(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: any
) {
  await runCorsMiddleware(req, res, cors);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ errorCode: "invalid token" });
  }

  const tokenParts = authToken.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ errorCode: "invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const { sub } = verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user_id = sub as string;
    return handler(req, res);
  } catch (error: any) {
    return res.status(401).json({ errorCode: "token expired" });
  }
}
