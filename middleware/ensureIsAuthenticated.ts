import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const ensureIsAuthenticated = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
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
      //   @ts-ignore
      req.user_id = sub as string;
      return handler(req, res);
    } catch (error: any) {
      return res.status(401).json({ errorCode: "token expired" });
    }
  };
};
