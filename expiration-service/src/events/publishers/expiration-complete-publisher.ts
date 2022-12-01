import { ExpirationComplete, Publisher, Subjects } from "@nahid597-tickethub/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}