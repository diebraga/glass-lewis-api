import { createMocks } from "node-mocks-http";
import { signUpUserController } from "../../controllers/signUpUserController/signUpUserController";
import { signUpUserService } from "../../services/signUpUserService/signUpUserService";

jest.mock("../../services/signUpUserService/signUpUserService");

describe("signUpUserController", () => {
  it("should return 405 if method is not POST", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await signUpUserController(req as any, res as any);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 409 if user already exists", async () => {
    (signUpUserService as jest.Mock).mockRejectedValue(
      new Error("User already exists!")
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "john@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      },
    });

    await signUpUserController(req as any, res as any);

    expect(res._getStatusCode()).toBe(409);
    expect(res._getJSONData()).toEqual({ error: "User already exists!" });
  });

  it("should return 400 if email or password is not provided", async () => {
    (signUpUserService as jest.Mock).mockRejectedValue(
      new Error("Email and password must be provided!")
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "",
        password: "",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      },
    });

    await signUpUserController(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: "Email and password must be provided!",
    });
  });

  it("should return 200 and the user with token if user is created successfully", async () => {
    const mockUser = {
      user: {
        id: 1,
        name: "John",
        surname: "Doe",
        email: "john@example.com",
        isAdmin: false,
      },
      token: "mockToken",
    };

    (signUpUserService as jest.Mock).mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "john@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      },
    });

    await signUpUserController(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockUser);
  });

  it("should return 500 on internal server error", async () => {
    (signUpUserService as jest.Mock).mockRejectedValue(
      new Error("Internal server error")
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "john@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      },
    });

    await signUpUserController(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ error: "Internal server error" });
  });
});
