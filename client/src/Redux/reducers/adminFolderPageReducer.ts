import {BaseThunkType, InferActionsTypes} from "../Redux-store";
import * as uuid from "uuid";
import {adminApi} from "../../Api/Api";

interface infoType {
    id: string,
    number: number
}

export interface cars {
    _id: string
    mainImg: string,
    nameOfFolder: string,
    Cars: Array<infoType>
}

let initialState = {
    ArrayFolders: [] as Array<cars>
}
type InitialState = typeof initialState;
export const adminFolderReducer = (state = initialState, action: ActionsTypes): InitialState => {

    switch (action.type) {
        case "setFromAdnimDB":
            return {
                ...state,
                ArrayFolders: action.folderData
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    setFromAdnimDB: (folderData: Array<cars>) => ({type: 'setFromAdnimDB', folderData} as const),
}

export const setAdminFolderToRedux = ():ThunkType => async (dispatch,getState) =>{
    const car = await adminApi.getGoods();
    dispatch(actions.setFromAdnimDB(car));
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>