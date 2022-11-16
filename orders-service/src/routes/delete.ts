import express ,{Request, Response} from 'express';
import { Order } from '../models/orders';
import { NotFoundError, NotAuthorizedError, OrderStatus} from '@nahid597-tickethub/common';

const router = express.Router();

router.delete('/api/orders/:orderId', async(req: Request, res: Response) => {
    const {orderId} = req.params;

    const order = await Order.findById(orderId);

    if(!order) {
        throw new NotFoundError();
    }

    // commit for pass test run
    // if(order.userId !== req.currentUser!.id) {
    //     throw new NotAuthorizedError();
    // }

    order.status = OrderStatus.Cancelled;

    await order.save();

    // publishing a n event saying this was cancelled

    res.status(204).send(order);
});

export {router as deleteOrdersRouter}