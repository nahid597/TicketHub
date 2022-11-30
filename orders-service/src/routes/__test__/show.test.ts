import { Ticket } from "../../models/ticket";
import request from 'supertest';
import { app } from "../../app";
import { signin } from "../../global/signin";
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

    // make request to fetch the order
    const {body: fetchOrder} = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(fetchOrder.id).toEqual(order.id);

});