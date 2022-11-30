import { Ticket } from "../../models/ticket";
import request from 'supertest';
import { app } from "../../app";
import { signin } from "../../global/signin";
import { Order, OrderStatus } from "../../models/orders";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";


it('Fetch a specific order', async() => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 29,
        title: 'concert'
    });

    const cookie = await signin();

    await ticket.save();

    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId: ticket.id})
        .expect(201);

    // make request to cancel the order
    const {body: updatedOrder1} = await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(204);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

});

it('Emit a event after cancel the order', async() => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 29,
        title: 'concert'
    });

    const cookie = await signin();

    await ticket.save();

    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId: ticket.id})
        .expect(201);

    // make request to cancel the order
    const {body: updatedOrder1} = await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(204);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
});