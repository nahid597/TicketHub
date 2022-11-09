import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@nahid597-tickethub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  // requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    // need to fixed global require auth method

    // if (ticket.userId !== req.currentUser?.id) {
    //   throw new NotAuthorizedError();
    // }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };