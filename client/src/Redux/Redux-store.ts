import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {showReducer} from "./reducers/showPageReducer";
import * as thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk";
import {folderReducer} from "./reducers/folderPageReducer";
import {authReducer} from "./reducers/authReducer";
import {adminFolderReducer} from "./reducers/adminFolderPageReducer";

let RootReducers= combineReducers({
    showPage: showReducer,
    folderPage: folderReducer,
    auth: authReducer,
    adminFolderPage: adminFolderReducer
});

type RootReducerType = typeof RootReducers;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(RootReducers,applyMiddleware(thunk.default));

// @ts-ignore
window.store = store;

export default store;