export class OrderModel {
    _id: string; 
    userId: string;
    cartId: string;
    price: number;
    city: string;
    street: string;
    deliveryDate: Date;
    initDate: Date;
    creditCard: string;
}