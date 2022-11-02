import jwt from "jsonwebtoken";

export const signin = async () => {
 
  const payload = {
    id: "1kafidasf",
    email: "a@a.com",
    name: "nahid"
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = {jwt: token};
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString('base64');

  return [`express:sess=${base64}`];
};
