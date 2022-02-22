import {BaseThunkType, InferActionsTypes} from "../Redux-store";
import {adminApi} from "../../Api/Api";
import {setClearFolder} from "./folderPageReducer";

interface IAddress {
    country: string | null;
    city: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
}

let initialState = {
    _id: '' as string,
        email: '' as string,
        avatar: null as null | string,
        avatarId: null as null | string,
        lastName: '' as string,
        firstName: '' as string,
        gender: null as null | string,
        address: null as null | IAddress,
        profession: '' as string,
        searchField: '' as string,
        phone: '' as string,
        roles: '' as string | Array<string>,
        folders: [] as Array<any>,
        accessToken: null as null | string,
}

type initialStateType = typeof initialState;
export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case "SET_AUTH_USER":
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    setAuthUserAC: (payload: initialStateType) => ({type: 'SET_AUTH_USER', payload} as const),
}
export const authMeTC = (): ThunkType => async (dispatch: any) => {
    if(localStorage.getItem("profile")){
        const storedProfile = await JSON.parse(localStorage.getItem("profile") || '');
        dispatch(actions.setAuthUserAC(storedProfile));
    }


}
export const deleteProfileTC = (): ThunkType => async (dispatch: any , getState) => {
    const clearProfile={
        _id: '',
        email: '',
        avatar: null,
        avatarId: null,
        lastName: '',
        firstName: '',
        gender: null,
        address: null,
        profession: '',
        searchField: '',
        phone: '',
        roles: '',
        folders: [],
        accessToken: null,
    }
    dispatch(setClearFolder());
    dispatch(actions.setAuthUserAC(clearProfile));
}

export const loginTC = (data: { email: string, password: string },history:any): ThunkType => async (dispatch: any) => {
    try {
        let response = await adminApi.loginMe(data);
        await localStorage.setItem("profile", JSON.stringify(response));
        dispatch(authMeTC());
        history.push({pathname: '/'});
    } catch (e) {
        console.log("FUCK");
    }
}
export const registerTC = (data: any ,history:any): ThunkType => async (dispatch: any) => {
    try {
        data = {...data,gender:'male'};
        let response = await adminApi.signUp(data);
        alert('Акаунт створено')
        history.push({pathname: '/login'});
    } catch (e) {
        alert(e);
        console.log("FUCK");
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>