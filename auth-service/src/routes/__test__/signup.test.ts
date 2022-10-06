import request from "supertest";
import { app } from "../../app";

it("Return 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
      password: "1234",
      name: "Nahid",
    })
    .expect(201);
});

it("Return 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "aa.com",
      password: "1234",
      name: "Nahid",
    })
    .expect(400);
});

it("Return 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "aa.com",
      password: "12",
      name: "Nahid",
    })
    .expect(400);
});

it("Return 400 with missing name, email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "1234",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "Nahid",
    })
    .expect(400);
});

it("Don't allow duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "aaa@a.com",
      password: "1234",
      name: "Nahid",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "aaa@a.com",
      password: "1234",
      name: "Nahid",
    })
    .expect(400);
});

it('set a cookie after successfully signup', async () => {
   const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "a@a.com",
            password: "1234",
            name: "Nahid"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})
