import { User } from "./user";

export class Subscription {
    
    id: String;
    price: String;
    user: User;
    subscriptionType: String;
    dateDebut: Date;
    dateFin: Date;
}