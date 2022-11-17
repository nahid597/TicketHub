import { OrderCancelledEvent, Publisher, Subjects } from "@nahid597-tickethub/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}