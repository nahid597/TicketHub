import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreateListener } from './events/ticket-created-listner';
import { TicketUpdatedListener } from './events/ticket-updated-listner';

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

    new TicketCreateListener(stan).listen();
    new TicketUpdatedListener(stan).listen();

});

stan.on("SIGINT", () => stan.close());
stan.on("SIGTERM", () => stan.close());