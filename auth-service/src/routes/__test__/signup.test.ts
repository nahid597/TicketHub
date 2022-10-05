import request from 'supertest';
import { app } from '../../app';

it('Return 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "a@a.com",
            password: "1234",
            name: "Nahid"
        })
        .expect(201);
});