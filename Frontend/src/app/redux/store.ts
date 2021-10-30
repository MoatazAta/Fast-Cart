import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { itemsReducer } from "./cart-items-state";
import { productsReducer } from "./products-state";

// Create an object containing all the reducers: 
const reducers = combineReducers({  authState: authReducer , productsState: productsReducer, itemsState: itemsReducer});

// Crete the store object:
const store = createStore(reducers);

// Export the store:
export default store;
