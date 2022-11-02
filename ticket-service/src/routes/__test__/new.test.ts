import  request  from "supertest";
import { app } from "../../app";
import {signin} from "../../global/signin"
import { Ticket } from "../../models/ticket";

it('Has a request handler listing to /api/tickets for post request', async() => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect( response.status).not.toEqual(404);

});

it('Can only access if the user is singed in', async() => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('Return other status code if the user is singed in', async() => {
    const cookie = await signin();

   const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});

    expect(response.status).not.toEqual(201);
});

it('Return a error if the title is not correct', async() => {
    const cookie = await signin();

    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);

        await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            price: 10
        })
        .expect(400);
});

it('Return a error if the price is not correct', async() => {
    const cookie = await signin(); 

    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'ticketing hub',
        price: -10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'ticket'
    })
    .expect(400);
});

it('create a ticket with valid input', async() => {
    const cookie = await signin();
    
    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'ticketing hub',
        price: 10
    })
    .expect(201); 

    expect(ticket.length).toEqual(1);
    expect(ticket[0].price).toEqual(10);

});
