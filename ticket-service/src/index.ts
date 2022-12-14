import {app} from './app';
import mongoose from 'mongoose';
import config from '../config';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const PORT = 8081 || process.env.PORT;

const start = async () => {  

    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY not set yet !!");
    }

    if(!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not found");
    }
    
    if(!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID not found");
    }

    if(!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID not found");
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, `http://${config.nats_srv}:4222`);

        natsWrapper.client.on('close', () => {
            console.log('Connection is close !!');
            process.exit();
        });

        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        // await mongoose.connect(process.env.MONGO_URI);
         await mongoose.connect(`mongodb://${config.ticket_mongo_srv}:27017/auth`);
        
        console.log("Connected with MondoDB !!!");
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Ticket server running on ${PORT} !!!!!!`)
    });
}

start();
