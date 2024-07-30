import { signUpUserService } from "../../services/signUpUserService/signUpUserService";
import pool from "../../lib/db";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

jest.mock("../../lib/db");
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("signUpUserService", () => {
  const mockUser = {
    id: 1,
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    isAdmin: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if email or password is not provided", async () => {
    await expect(
      signUpUserService({
        email: "",
        password: "",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      })
    ).rejects.toThrow("Email and password must be provided!");
  });

  it("should throw an error if the user already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

    await expect(
      signUpUserService({
        email: "john@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      })
    ).rejects.toThrow("User already exists!");
  });

  it("should create a new user and return the user with token", async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [mockUser] });

    (hash as jest.Mock).mockResolvedValue("hashedPassword");
    (sign as jest.Mock).mockReturnValue("mockToken");

    const result = await signUpUserService({
      email: "john@example.com",
      password: "password123",
      name: "John",
      surname: "Doe",
      isAdmin: false,
    });

    expect(result).toEqual({
      user: mockUser,
      token: "mockToken",
    });
  });
});
