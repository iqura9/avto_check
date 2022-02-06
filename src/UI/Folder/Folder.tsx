import React from 'react';
import './folder.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {useHistory} from "react-router-dom";
import {actions} from "../../Redux/reducers/folderPageReducer";
import * as uuid from 'uuid';

const Folder = () => {
    const cars = useSelector((state: AppStateType) => state.folderPage.ArrayFolders);
    const history =useHistory();
    const dispatch = useDispatch();
    const folder =  require("./../../img/folder.png")
    const nextPage  = (id:string | number) =>{
        history.push(`/folder/${id}`);
    }

    const creatFolder = (folderName:string) =>{
        let newId = uuid.v4();
        let push = {
            folderId:newId,
            mainImg: '',
            nameOfFolder: folderName +' - '+ newId.slice(0,4),
            Cars:[]
        }
        dispatch(actions.addNewFolder(push));

    }
    return (
        <div className='MainBlockWrapper'>
            {
                cars.map(m => {
                    return (<div className='Block_Wrapper'  onClick={() => nextPage(m.folderId)}>
                            <span className='Block_Center'>{m.Cars.length}</span>
                            <div className='Block_content'>
                                <img className='Block_content-img' src={folder} alt=""/>
                                <div>{m.nameOfFolder}</div>
                            </div>

                        </div>
                    )
                })
            }
            <div className='Block_Wrapper'  onClick={() => creatFolder('new folder')}>
                <span className='Block_Center-add'>+</span>
                <div className='Block_content'>
                    <div className='Circle'></div>
                    <div className='Minus'>Add Folder</div>
                </div>

            </div>
        </div>
    );
};

export default Folder;