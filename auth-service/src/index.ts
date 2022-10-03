import express from 'express';
import 'express-async-errors'
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/current-user'
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';

import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {  

    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY not set yet !!")
    }

    try {
        await mongoose.connect('mongodb://10.111.31.106:27017/auth');
        
        console.log("Connected with MondoDB !!!");
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Auth server running on ${PORT} !!!!!!`)
    });
}

start();
