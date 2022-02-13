import {BaseThunkType, InferActionsTypes} from "../Redux-store";

interface infoType {
    id: number,
    number: number
}

let initialState = {
    MainNumberURL:'' as string | number,
}
type InitialState = typeof initialState;
export const showReducer = (state=initialState, action:ActionsTypes):InitialState =>{

    switch (action.type) {
        case 'newURL':
            return{
                ...state,
                MainNumberURL: action.url
            }
        case 'initProgram':
            return{
                ...state,
                MainNumberURL:JSON.parse(localStorage.getItem('mainURL') || ""),
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    changeUrl: (url:string | number) => ({type: 'newURL', url} as const),
    setInitializeProgram: () => ({type: 'initProgram',} as const),
}


type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>