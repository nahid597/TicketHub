import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});


stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('Connection is close !!');
        process.exit();
    });

    const options = stan.subscriptionOptions()
                        .setManualAckMode(true)
                        .setDeliverAllAvailable()
                        .setDurableName('account-service');

    const subscription = stan.subscribe('ticket:created', 'queue-group-name', options);

    subscription.on('message', (msg:Message) => {
       const data = msg.getData();

       console.log(`Received event # ${msg.getSequence()}, with data: ${data}`);

       msg.ack();
       
    });

});

stan.on("SIGINT", () => stan.close());
stan.on("SIGTERM", () => stan.close());