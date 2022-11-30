import  request  from "supertest";
import { app } from "../../app";
import { signin } from "../../global/signin";
import { Ticket } from "../../models/ticket"
import mongoose from 'mongoose'


const buildTicket = async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'concert'
    });

    await ticket.save();

    return ticket;
}

it('fetched all orders for a particular user', async() => {
    //const userOne = await signin();
    const userOne = "6373e5a4a4bf5842cfa1cc8f";

    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();

    // make a order
     const {body:orderOne}= await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ticketId: ticketOne.id})
        .expect(201);

        const {body:orderTwo} =  await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ticketId: ticketTwo.id})
        .expect(201);

        const response = await request(app)
            .get('/api/orders')
            .set('Cookie', userOne)
            .expect(200);

       expect(response.body.length).toEqual(2);
       expect(response.body[0].id).toEqual(orderOne.id);
       expect(response.body[1].id).toEqual(orderTwo.id);
       
})