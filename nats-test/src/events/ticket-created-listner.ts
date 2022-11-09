import {Message} from 'node-nats-streaming';
import { Listener } from '@nahid597-tickethub/common';
import { Subjects } from '../../../common/src/events/subjects';
import { TicketCreatedEvent } from '@nahid597-tickethub/common';

export class TicketCreateListener extends Listener<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payment-service";

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data! ', data);

        msg.ack();
    }
}