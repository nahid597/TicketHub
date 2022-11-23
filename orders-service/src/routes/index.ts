import { requireAuth } from "@nahid597-tickethub/common";
import express, { Request, Response } from "express";
import { Order } from "../models/orders";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    // test purpose used fic users
    // userId: '6373e5a4a4bf5842cfa1cc8f'
     userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export { router as indexOrdersRouter };
