import { legacy_createStore as createStore } from "redux";
import combineReducers from "./../reducers/combineReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import toggleSidebarReducer from "../reducers/toggleSidebarReducer";

let store = createStore(combineReducers, composeWithDevTools());
// let store = createStore(toggleSidebarReducer, composeWithDevTools());
export default store;
