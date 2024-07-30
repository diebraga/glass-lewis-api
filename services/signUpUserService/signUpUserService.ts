import pool from "../../lib/db";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface SignUpParams {
  email: string;
  password: string;
  name: string;
  surname: string;
  isAdmin: boolean;
}

export const signUpUserService = async ({
  email,
  password,
  name,
  surname,
  isAdmin,
}: SignUpParams) => {
  if (!password || !email) {
    throw new Error("Email and password must be provided!");
  }

  const userResult = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );
  const user = userResult.rows[0];

  if (user) {
    throw new Error("User already exists!");
  }

  const passwordHash = await hash(password, 8);

  const createUserResult = await pool.query(
    "INSERT INTO users (name, surname, email, password, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, surname, email, isAdmin",
    [name, surname, email, passwordHash, isAdmin]
  );
  const createUser = createUserResult.rows[0];

  const token = sign(
    {
      id: createUser.id,
      iat: new Date().getTime(),
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
      subject: String(createUser.id),
    }
  );

  return {
    user: {
      id: createUser.id,
      name: createUser.name,
      surname: createUser.surname,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
    },
    token,
  };
};
