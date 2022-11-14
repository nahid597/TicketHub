import { Publisher, Subjects, TicketCreatedEvent } from "@nahid597-tickethub/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
} 