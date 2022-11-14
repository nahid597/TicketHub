import {Message} from 'node-nats-streaming';
import { Listener, TickerUpdatedEvent } from '@nahid597-tickethub/common';
import { Subjects } from '@nahid597-tickethub/common';

export class TicketUpdatedListener extends Listener<TickerUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = "payment-service";

    onMessage(data: TickerUpdatedEvent['data'], msg: Message) {
        console.log('Event data! ', data);

        msg.ack();
    }
}