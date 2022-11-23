import {  NotAuthorizedError, NotFoundError, requireAuth } from '@nahid597-tickethub/common';
import express ,{Request, Response} from 'express';
import { Order } from '../models/orders';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async(req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if(!order) {
        throw new NotFoundError();
    }

    // commit for pass test run
    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
});

export {router as showOrdersRouter}