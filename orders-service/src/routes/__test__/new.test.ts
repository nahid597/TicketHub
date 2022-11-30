import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../global/signin';
import { Order, OrderStatus } from '../../models/orders';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('Returns an error if the ticket does not exist on order service', async() => {
    const cookie = await signin();
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId})
        .expect(404);
});

it('Returns an error if the ticket is already reserved', async() => {
    const cookie = await signin();
    
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'concert'
    });

    await ticket.save();

    const order = Order.build({
        userId: 'asfdu7asdf',
        ticket,
        status: OrderStatus.Created,
        expiresAt: new Date()
    });

    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId: ticket.id})
        .expect(400);

});

it('Reserved a ticket', async() => {
    const cookie = await signin();
    
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'concert'
    });

    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId: ticket._id})
        .expect(201);
});

it('Emits a event after created order', async() => {
    const cookie = await signin();
    
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'concert'
    });

    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ticketId: ticket._id})
        .expect(201);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
});