import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { BadRequestError } from "@nahid597-tickethub/common";
import { User } from "../models/user";
import { validateRequest } from "@nahid597-tickethub/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Provide valid email please"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const {email, password, name} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
      throw new BadRequestError("Email already used !!");
    }
    
    const user = User.build({name, email, password});
    await user.save();

    // generate jwt
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    }
   
    res.status(201).send(user);
  }
);

export { router as signUpRouter };
