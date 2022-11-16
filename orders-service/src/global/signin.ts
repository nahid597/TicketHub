import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const signin = async () => {
 
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "a@a.com",
    name: "nahid"
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = {jwt: token};
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString('base64');

  return [`express:sess=${base64}`];
};
