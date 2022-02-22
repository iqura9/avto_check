import React, {useEffect, useRef, useState} from 'react';
import './folder.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {useHistory, useParams} from "react-router-dom";
import {
    actions,
    addNewFolder,
    chnageNameFolderThunk,
     deleteFolderX,
    setCarFromDB
} from "../../Redux/reducers/folderPageReducer";
import * as uuid from 'uuid';
import {useForm} from "react-hook-form";
import {adminApi} from "../../Api/Api";
import ShowFolderFC from "./ShowFolderFC";
import {setAdminFolderToRedux} from "../../Redux/reducers/adminFolderPageReducer";

interface IProps{
    seeAll?: boolean
}


const Folder:React.FC<IProps> = ({seeAll}) => {
    const user = useSelector( (state:AppStateType) => state.auth);
    const cars = useSelector((state: AppStateType) => state.folderPage.ArrayFolders);
    const AdminFolderCars = useSelector((state: AppStateType) => state.adminFolderPage.ArrayFolders);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = history.location.pathname;

    let SortedCars;
    if(seeAll){
        if(AdminFolderCars.length===0) dispatch(setAdminFolderToRedux());
        SortedCars = AdminFolderCars.slice(0);
    }else{
        if(cars.length===0) dispatch(setCarFromDB(user._id));
        SortedCars = cars.slice(0);
    }
    SortedCars.sort(function(a,b) {
        return b.Cars.length - a.Cars.length;
    });


    const nextPage = (id: string | number) => {
        history.push(`/folder/${id}`);
    }

    const creatFolder = (folderName: string) => {
        let newId = uuid.v4();
        let newFolder = {
            mainImg: '',
            nameOfFolder: folderName + ' - ' + newId.slice(0, 4),
            Cars: [],
            userId: user._id
        }
         dispatch(addNewFolder(newFolder));
    }

    const deleteFolder = (id:string) =>{
        dispatch(deleteFolderX(id,user._id));
    }
    return (
        <ShowFolderFC SortedCars={SortedCars} nextPage={nextPage} creatFolder={creatFolder} deleteFolder={deleteFolder}/>
    );
};

export default Folder;