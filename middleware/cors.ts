import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

export const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT"],
  origin: true,
  optionsSuccessStatus: 200,
});

// Helper method to wait for a middleware to execute before continuing
export function runCorsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
