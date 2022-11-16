import { Ticket } from "../../models/ticket";
import request from 'supertest';
import { app } from "../../app";
import { signin } from "../../global/signin";
import { Order, OrderStatus } from "../../models/orders";


it('Fetch a specific order', async() => {
    const ticket = Ticket.build({
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

it.todo('Emit a event after cancel the order');