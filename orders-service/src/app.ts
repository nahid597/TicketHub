import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError,errorHandler, currentUser } from '@nahid597-tickethub/common';
import { createOrdersRouter } from './routes/new';
import { showOrdersRouter } from './routes/show';
import { indexOrdersRouter } from './routes';
import { deleteOrdersRouter } from './routes/delete';



const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createOrdersRouter);
app.use(showOrdersRouter);
app.use(indexOrdersRouter);
app.use(deleteOrdersRouter);


app.all('*', async(req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export {app}