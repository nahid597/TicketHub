import  Queue  from "bull";
import config from "../../config";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
         // host: process.env.REDIS_HOST
        host: config.expiration_redis_srv,
        port: 6379
    }
});

expirationQueue.process(async(job) => {

    const publisher = new ExpirationCompletePublisher(natsWrapper.client);

    await publisher.publish({
        orderId: job.data.orderId
    });
    
});

export {expirationQueue}