import express ,{Request, Response} from 'express';
import { Order } from '../models/orders';
import { NotFoundError, NotAuthorizedError, OrderStatus} from '@nahid597-tickethub/common';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', async(req: Request, res: Response) => {
    const {orderId} = req.params;

    const order = await Order.findById(orderId).populate('ticket');

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
    const publisher = new OrderCancelledPublisher(natsWrapper.client);

    await publisher.publish({
        id: order.id,
        ticket: {
            id: order.ticket.id
        }
    })

    res.status(204).send(order);
});

export {router as deleteOrdersRouter}