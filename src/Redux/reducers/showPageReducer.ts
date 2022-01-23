import {BaseThunkType, InferActionsTypes} from "../Redux-store";

interface infoType {
    id: number,
    number: number
}


let initialState = {
    MainNumberURL:'' as string | number,
    info:[
        /*{id:1, number: 334443113}*/
    ] as Array<infoType>
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
                info:JSON.parse(localStorage.getItem('testObject') || ""),
                MainNumberURL:JSON.parse(localStorage.getItem('mainURL') || ""),
            }
        case 'setInxToInfo':
            return{
                ...state,
                info:[...state.info, {id: state.info.length+1, number: action.number}]
            }
        case 'deleteId':
            return{
                ...state,
                info:state.info.filter(f => f.number !=action.id)
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    changeUrl: (url:string | number) => ({type: 'newURL', url} as const),
    setInitializeProgram: () => ({type: 'initProgram',} as const),
    setInxToInfo: (number:number) => ({type: 'setInxToInfo', number} as const),
    deleteIdAC: (id:number) => ({type: 'deleteId', id} as const)
}


export const sendThunka = (number:number):ThunkType => async (dispatch,getState) =>{
    let response = /*await*/ dispatch(actions.setInxToInfo(number));
    if(response) {
        localStorage.setItem('testObject', JSON.stringify(getState().showPage.info));
    }
}
export const deleteIdACThunk = (number:number):ThunkType => async (dispatch,getState) =>{
    let response = /*await*/ dispatch(actions.deleteIdAC(number));
    if(response) {
        localStorage.setItem('testObject', JSON.stringify(getState().showPage.info));
        dispatch(actions.setInitializeProgram());
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>