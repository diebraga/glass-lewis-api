import { NextApiRequest, NextApiResponse } from "next";
import { signUpUserService } from "../../services/signUpUserService/signUpUserService";

export const signUpUserController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password, name, surname, isAdmin } = req.body;

  try {
    const result = await signUpUserService({
      email,
      password,
      name,
      surname,
      isAdmin,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "User already exists!") {
      return res.status(409).json({ error: error.message });
    } else if (error.message === "Email and password must be provided!") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
