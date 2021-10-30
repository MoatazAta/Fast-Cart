import { UserModel } from "./user.model";

export class CartModel {
    _id: string;
    userId: string;
    date: Date;
    isPaid: Boolean;
    user: UserModel;
}
