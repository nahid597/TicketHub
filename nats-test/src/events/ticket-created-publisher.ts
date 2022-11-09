import { Publisher } from "@nahid597-tickethub/common";
import { Subjects } from "../../../common/src/events/subjects";
import { TicketCreatedEvent } from "@nahid597-tickethub/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

} 