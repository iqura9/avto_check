
let initialState = {
    MainNumberURL:'',
    info:[
        /*{id:1, number: 334443113}*/
    ]
}

export const showReducer = (state=initialState, action) =>{

    switch (action.type) {
        case 'newURL':
            return{
                ...state,
                MainNumberURL: action.url
            }
        case 'initProgram':
            return{
                ...state,
                info:JSON.parse(localStorage.getItem('testObject')),
                MainNumberURL:JSON.parse(localStorage.getItem('mainURL')),
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
export const changeUrl = (url) => {
    return{
        type: 'newURL',
        url
    }
}
export const setInitializeProgram = () => {
    return{
        type: 'initProgram',
    }
}
export const setInxToInfo = (number) => {
    return{
        type: 'setInxToInfo',
        number
    }
}
export const deleteIdAC = (id) => {
    return{
        type: 'deleteId',
        id
    }
}


export const sendThunka = (number) => async (dispatch,getState) =>{
    let response = await dispatch(setInxToInfo(number));
    if(response) {
        localStorage.setItem('testObject', JSON.stringify(getState().showPage.info));
    }
}
export const deleteIdACThunk = (number) => async (dispatch,getState) =>{
    let response = await dispatch(deleteIdAC(number));
    if(response) {
        localStorage.setItem('testObject', JSON.stringify(getState().showPage.info));
        dispatch(setInitializeProgram());
    }
}