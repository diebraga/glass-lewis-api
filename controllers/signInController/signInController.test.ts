import { NextApiRequest, NextApiResponse } from "next";
import { signInController } from "./signInController";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pool from "../../lib/db";
import { createMocks } from "node-mocks-http";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../lib/db", () => ({
  query: jest.fn(),
}));

describe("signInController", () => {
    it("should return 405 if method is not POST", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "GET",
      });
  
      await signInController(req, res);
  
      expect(res._getStatusCode()).toBe(405);
    });
  
    it("should return 401 if email is not found", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "POST",
        body: {
          email: "notfound@example.com",
          password: "password123",
        },
      });
  
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });
  
      await signInController(req, res);
  
      expect(res._getStatusCode()).toBe(401);
      expect(res._getJSONData()).toEqual({ error: "Email or password incorrect!" });
    });
  
    it("should return 401 if password does not match", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "POST",
        body: {
          email: "user@example.com",
          password: "wrongpassword",
        },
      });
  
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, password: "hashedpassword" }] });
      (compare as jest.Mock).mockResolvedValueOnce(false);
  
      await signInController(req, res);
  
      expect(res._getStatusCode()).toBe(401);
      expect(res._getJSONData()).toEqual({ error: "Email or password incorrect!" });
    });
  
    it("should return 200 and token if email and password are correct", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "POST",
        body: {
          email: "user@example.com",
          password: "password123",
        },
      });
  
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, password: "hashedpassword" }] });
      (compare as jest.Mock).mockResolvedValueOnce(true);
      (sign as jest.Mock).mockReturnValueOnce("jsonwebtoken");
  
      await signInController(req, res);
  
      expect(res._getStatusCode()).toBe(200);
      expect(res._getJSONData()).toEqual({ token: "jsonwebtoken" });
    });
  
    it("should return 500 on server error", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "POST",
        body: {
          email: "user@example.com",
          password: "password123",
        },
      });
  
      (pool.query as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
  
      await signInController(req, res);
  
      expect(res._getStatusCode()).toBe(500);
      expect(res._getJSONData()).toEqual({ error: "DB error" });
    });
  });
