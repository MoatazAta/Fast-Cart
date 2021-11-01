import { CartModel } from "../models/cart.model";

export class CartState {
    public cart: CartModel = null;
}

export enum CartActionType {
    CartDownloaded = "CartDownloaded",
    CartAdded = "CartAdded",
    CartPaid = "CartPaid"
}

export interface CartAction {
    type: CartActionType;
    payload?: any;
}

export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.CartAdded, payload: cart };
}
export function cartDownloadedAction(cart: CartModel): CartAction {
    return { type: CartActionType.CartDownloaded, payload: cart };
}

export function cartPaidAction(): CartAction {
    return { type: CartActionType.CartPaid };
}

export function cartReducer(currentState: CartState = new CartState(), action: CartAction): CartState {

    const newState = { ...currentState };


    switch (action.type) {
        case CartActionType.CartDownloaded:
        case CartActionType.CartAdded:
            newState.cart = action.payload;
            break;
        case CartActionType.CartPaid:
            newState.cart.isPaid = true;
            break;
    }

    return newState;
}
