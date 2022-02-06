import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AppStateType} from "../../Redux/Redux-store";
import {useSelector} from "react-redux";
import {ShowImgInRow} from "../FIRST_PAGE/ShowImgInRow";
import {deleteIdACThunk} from "../../Redux/reducers/showPageReducer";
import './folder.css';
import {actions} from "../../Redux/reducers/folderPageReducer";

interface PropsType {

}
interface paramType {
    id: string
}
const FolderInfo:React.FC<PropsType> = (props) => {
    const {id} = useParams<paramType>();
    const state = useSelector( (state:AppStateType) => state.folderPage.ArrayFolders);
    let res = state.find( q => q.folderId === id);
    return (
        <div className='Align_NIW'>
            {
                res && res.Cars.map( m => {
                return <ShowImgInRow url={m.number} deleteNew={actions.deleteId} folderID={id} productID={m.id}/>;
            })}
        </div>
    );
};

export default FolderInfo;