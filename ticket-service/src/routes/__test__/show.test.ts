import mongoose from "mongoose";
import  request  from "supertest";
import { app } from '../../app';
import { signin } from "../../global/signin";

it('Return 404 if there is no ticket exists', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('Return the ticket if there is a ticket exists', async() => {
    const cookie = await signin();
    const title = "concert";
    const price = 20;

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title,
        price
    })
    .expect(201);
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

        expect(ticketResponse.body.title).toEqual(title);
        expect(ticketResponse.body.price).toEqual(price);

});
