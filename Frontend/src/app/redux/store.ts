import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { itemsReducer } from "./cart-items-state";
import { cartReducer } from "./cart-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({ authState: authReducer, productsState: productsReducer, itemsState: itemsReducer, cartState: cartReducer });

const store = createStore(reducers);

export default store;
