import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";

// Create an object containing all the reducers: 
const reducers = combineReducers({  authState: authReducer });

// Crete the store object:
const store = createStore(reducers);

// Export the store:
export default store;
