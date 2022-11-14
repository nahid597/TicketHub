import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../global/signin';



it('Return 404 if the provided id does not exists', async() => {
    const cookie = await signin();
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', cookie)
        .send({
            title: "Update ticket",
            price: 30
        })
        .expect(404);
});


it('Return 401 if the user not signed in', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "Update ticket",
            price: 30
        })
        .expect(401);
});

it('Return 401 if the the user does not own the ticket', async() => {
    const cookie = await signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "asfsdfs",
            price: 20
        });

        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .send({
            title: "Update ticket",
            price: 300
        })
        .expect(401);
});

it('Return 400 if the provided title and price is not valid', async() => {
    const cookie = await signin();

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: "asfsdfs",
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({
        title: "",
        price: 300
    })
    .expect(400);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({
        title: "update title",
        price: -300
    })
    .expect(400);

});

it('Update a ticket with valid input', async() => {
    const cookie = await signin();

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: "asfsdfs",
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({
        title: "update ticket",
        price: 300
    })
    .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

        expect(ticketResponse.body.title).toEqual("update ticket");
        expect(ticketResponse.body.price).toEqual(300);


});
