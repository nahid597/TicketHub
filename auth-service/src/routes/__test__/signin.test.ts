import request from "supertest";
import { app } from "../../app";

it("email supply that does not exit", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(400);
});

it("password supply that is wrong", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
      password: "1234",
      name: "Nahid Hasan",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "123545",
    })
    .expect(400);
});

it("set a cookie after successfully signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
      password: "1234",
      name: "Nahid",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
