import {BaseThunkType, InferActionsTypes} from "../Redux-store";
import * as uuid from "uuid";

interface infoType {
    id: string,
    number: number
}

interface cars {
    folderId: string
    mainImg: string,
    nameOfFolder: string,
    Cars: Array<infoType>
}

let initialState = {
    ArrayFolders: [
        {
            folderId: 'FolderNumber1',
            mainImg: '',
            nameOfFolder: 'folder',
            Cars: [
                {id: '1', number: 334443119},
                {id: '2', number: 334443120},
                {id: '3', number: 334443121},
            ] as Array<infoType>
        },
        {
            folderId: 'FolderNumber2',
            mainImg: '' as string | null,
            nameOfFolder: 'Temp Folder' as string,
            Cars: [] as Array<infoType>
        }
    ] as Array<cars>
}
type InitialState = typeof initialState;
export const folderReducer = (state = initialState, action: ActionsTypes): InitialState => {

    switch (action.type) {
        case "deleteId":
            //debugger;
            return {
                ...state,
                ArrayFolders: state.ArrayFolders.map(u => {
                    if (u.folderId === action.folderID) {
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
                    if (u.folderId === action.folderId) {
                        return {...u, nameOfFolder: action.folderName};
                    }
                    return {...u};
                })
            }
        case "iqura/folder/setCarToTheFolder":
            return{
                ...state,
                ArrayFolders: state.ArrayFolders.map( u=>{
                    if(u.folderId === action.folderId){
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
    changeName: (folderId: string, folderName: string) => ({type: 'changeName', folderId, folderName} as const),
    setCarToTheFolder: (folderId: string, carFull: infoType) => ({type: 'iqura/folder/setCarToTheFolder', folderId, carFull} as const),

}
export const setCarToFolderThunk = (folderId: string,carId:number):ThunkType => async (dispatch,getState) =>{
    let newId = uuid.v4();
    let car = {id: newId, number: carId};
    dispatch(actions.setCarToTheFolder(folderId, car));

}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>