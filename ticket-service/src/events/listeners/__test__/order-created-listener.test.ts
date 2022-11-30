import { OrderCreatedEvent, OrderStatus } from "@nahid597-tickethub/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener"

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: "concert",
        price: 20,
        userId: 'adsf'
    });

    await ticket.save();

    // create the fake data event

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'sdfsd',
        expiresAt: 'sadf',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

   // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, ticket, data, msg}
}

it('sets userId of the ticket', async() => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updateTicket = await Ticket.findById(ticket.id);

    expect(updateTicket?.orderId).toEqual(data.id);
});

it('acks the message', async() => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket update event', async() => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});