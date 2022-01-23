import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {showReducer} from "./reducers/showPageReducer";
import * as thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk";

let RootReducers= combineReducers({
    showPage: showReducer
});

type RootReducerType = typeof RootReducers;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(RootReducers,applyMiddleware(thunk.default));
// @ts-ignore
window.store = store;

export default store;