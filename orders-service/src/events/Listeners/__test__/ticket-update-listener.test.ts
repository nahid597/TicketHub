import { TicketCreatedEvent } from "@nahid597-tickethub/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listener"

const setup = async() => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });

    await ticket.save();

    const data: TicketCreatedEvent["data"] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 4040,
        userId: "sadlfj"
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {ticket, msg, data, listener};
}

it('find, updates and saves a ticket', async() => {
    const {ticket, msg, data, listener} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const {ticket, msg, data, listener} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})