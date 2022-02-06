import {BaseThunkType, InferActionsTypes} from "../Redux-store";

interface infoType {
    id: string,
    number: number
}
interface cars {
    folderId:number | string
    mainImg: string,
    nameOfFolder: string,
    Cars: Array<infoType>
}

let initialState = {
    ArrayFolders:[
        {
            folderId:'FolderNumber1',
            mainImg: '',
            nameOfFolder: 'folder',
            Cars:[
                {id:'1', number: 334443113},
                {id:'2', number: 334443115},
                {id:'3', number: 334443114},
            ] as Array<infoType>
        },
        {
            folderId: 'FolderNumber2',
            mainImg: '' as string | null,
            nameOfFolder: 'folder2' as string,
            Cars:[
                {id:'3', number: 334443118},
                {id:'4', number: 334443119},
                {id:'5', number: 334443119},
                {id:'6', number: 334443119},
                {id:'7', number: 334443119},
            ] as Array<infoType>
        }
    ] as Array<cars>
}
type InitialState = typeof initialState;
export const folderReducer = (state=initialState, action:ActionsTypes):InitialState =>{

    switch (action.type) {
        case "deleteId":
            //debugger;
            return{
                ...state,
                ArrayFolders: state.ArrayFolders.map( u=> {
                    if(u.folderId === action.folderID){
                         return {...u, Cars: u.Cars.filter(f => f.id != action.productID)}
                    }
                    return {...u , ...u.Cars};
                })
            }
        case "addNewFolder":
            return{
                ...state,
                ArrayFolders: [...state.ArrayFolders,action.folderData]
            }
        default: {
            return state;
        }
    }
}

export const actions = {
    deleteId: (folderID:string, productID:string) => ({type: 'deleteId', folderID, productID} as const),
    addNewFolder: (folderData:cars) => ({type: 'addNewFolder',folderData} as const)
}




type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>