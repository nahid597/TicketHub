import { OrderCreatedEvent, Publisher, Subjects } from "@nahid597-tickethub/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}