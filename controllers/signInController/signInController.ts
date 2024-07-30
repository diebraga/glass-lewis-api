import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pool from "../../lib/db";
import { SignInResData } from "@/pages/api/signin";

export const signInController = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResData>
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Email or password incorrect!" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email or password incorrect!" });
    }

    const token = sign(
      {
        id: user.id,
        iat: new Date().getTime(),
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
        subject: String(user.id),
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
