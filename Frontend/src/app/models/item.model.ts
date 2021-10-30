import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";
 
export class ItemModel {
    _id: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    cartId: string;
    product: ProductModel;
    cart: CartModel;
}
 