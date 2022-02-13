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
export const folderReducer = (state = initialState, action: ActionsTypes): InitialState => {

    switch (action.type) {
        case "setFromDB":
            return {
                ...state,
                ArrayFolders: action.folderData
            }
        case "deleteId":
            //debugger;
            return {
                ...state,
                ArrayFolders: state.ArrayFolders.map(u => {
                    if (u._id === action.folderID) {
                        return {...u, Cars: u.Cars.filter(f => f.id != action.productID)}
                    }
                    return {...u, ...u.Cars};
                })
            }
        case "addNewFolder":
            return {
                ...state,
                ArrayFolders: [...state.ArrayFolders, action.folderData],
            }
        case "changeName":
            return {
                ...state,
                ArrayFolders: state.ArrayFolders.map(u => {
                    if (u._id === action.folderId) {
                        return {...u, nameOfFolder: action.folderName};
                    }
                    return {...u};
                })
            }
        case "iqura/folder/setCarToTheFolder":
            return{
                ...state,
                ArrayFolders: state.ArrayFolders.map( u=>{
                    if(u._id === action.folderId){
                        return{...u, Cars: [...u.Cars,action.carFull]}
                    }
                    return{...u, ...u.Cars};
                })
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    deleteId: (folderID: string, productID: string) => ({type: 'deleteId', folderID, productID} as const),
    addNewFolder: (folderData: cars) => ({type: 'addNewFolder', folderData} as const),
    setFromDB: (folderData: Array<cars>) => ({type: 'setFromDB', folderData} as const),
    changeName: (folderId: string, folderName: string) => ({type: 'changeName', folderId, folderName} as const),
    setCarToTheFolder: (folderId: string, carFull: infoType) => ({type: 'iqura/folder/setCarToTheFolder', folderId, carFull} as const),

}

export const deleteCarThunk = (folderId:string,productID:string):ThunkType => async (dispatch,getState) =>{
    if(dispatch(actions.deleteId(folderId,productID))){
        const carToSend = await getState().folderPage.ArrayFolders.find(f => f._id == folderId);
        await adminApi.updateFolderName(folderId,carToSend);
    }
}
export const setCarToFolderThunk = (folderId: string,carId:number):ThunkType => async (dispatch,getState) =>{
    let newId = uuid.v4();
    let car = {id: newId, number: carId};
    if(dispatch(actions.setCarToTheFolder(folderId, car))) {
        const carToSend = await getState().folderPage.ArrayFolders.find(f => f._id == folderId);
        await adminApi.updateFolderName(folderId,carToSend);
    }
}
export const setCarFromDB = ():ThunkType => async (dispatch,getState) =>{
    const car = await adminApi.getGoods()
    dispatch(actions.setFromDB(car));
}
export const addNewFolder = (data:any):ThunkType => async (dispatch,getState) =>{
    const car = await adminApi.addNewFolder(data);
    dispatch(actions.addNewFolder(car));
}
export const chnageNameFolderThunk = (folderId:string,folderName:string):ThunkType => async (dispatch,getState) =>{
    if(dispatch(actions.changeName(folderId,folderName))){
        const car = await getState().folderPage.ArrayFolders.find(f => f._id == folderId);
        await adminApi.updateFolderName(folderId,car);
    }
}
export const deleteFolderX = (id:string):ThunkType => async (dispatch,getState) =>{
    await adminApi.deleteFolder(id);
    await dispatch(setCarFromDB());
}
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>