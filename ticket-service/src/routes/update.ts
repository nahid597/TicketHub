import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@nahid597-tickethub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
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

    // commit for automation test. For production we must un commit this lines
    if (ticket.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    if(ticket.orderId) {
      throw new BadRequestError('Reserved ticket can not be update');
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();

    const publisher = new TicketUpdatedPublisher(natsWrapper.client);

    await publisher.publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
