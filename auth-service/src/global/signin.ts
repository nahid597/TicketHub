import request from "supertest";
import { app } from "../app";

export const signin = async () => {
  const email = "a@a.com";
  const password = "1234";
  const name = "Nahid";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
      name,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
