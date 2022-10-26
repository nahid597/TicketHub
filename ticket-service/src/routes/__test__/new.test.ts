import  request  from "supertest";
import { app } from "../../app";

it('Has a request handler listing to /api/tickets for post request', async() => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect( response.status).not.toEqual(404);

});

it('Can only access if the user is singed in', async() => {

});

it('Return a error if the title is not correct', async() => {

});

it('Return a error if the price is not correct', async() => {

});

it('create a ticket with valid input', async() => {

});
