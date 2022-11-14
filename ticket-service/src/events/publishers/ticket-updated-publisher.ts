import { Publisher, Subjects, TicketUpdatedEvent } from "@nahid597-tickethub/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
} 