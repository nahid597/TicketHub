import {app} from './app';
import mongoose from 'mongoose';
import config from '../config';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/Listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/Listeners/ticket-updated-listener';

const PORT = 8082 || process.env.PORT;

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

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();

        // await mongoose.connect(process.env.MONGO_URI);
         await mongoose.connect(`mongodb://${config.orders_mongo_srv}:27017/orders`);
        
        console.log("Orders Service Connected with MondoDB !!!");
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Orders server running on ${PORT} !!!!!!`)
    });
}

start();
