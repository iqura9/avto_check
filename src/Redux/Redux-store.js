import {applyMiddleware, combineReducers, createStore} from "redux";
import {showReducer} from "./reducers/showPageReducer";
import * as thunk from "redux-thunk";

let RootReducers= combineReducers({
    showPage: showReducer
});


let store = createStore(RootReducers,applyMiddleware(thunk.default));
window.store = store;
export default store;