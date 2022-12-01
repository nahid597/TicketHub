import { ExpirationComplete, Listener, OrderStatus, Subjects } from "@nahid597-tickethub/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";


export class ExpirationCompleteListener extends Listener<ExpirationComplete> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationComplete['data'] , msg: Message){
        const order = await Order.findById(data.orderId).populate('ticket');

        if(!order) {
            throw new Error('Order not found');
        }

        if(order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.Cancelled
        });

        await order.save();

        const publisher = new OrderCancelledPublisher(this.client);

        await publisher.publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        msg.ack();
    }
}