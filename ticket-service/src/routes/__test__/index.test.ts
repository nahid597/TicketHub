import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../global/signin';

const generateTicket = async() => {
    const cookie = await signin();
    const title = "concert";
    const price = 20;

    return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title,
        price
    })
}

it('Return all tickets', async() => {
   await generateTicket();
   await generateTicket();
   await generateTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

        expect(response.body.length).toEqual(3);
});