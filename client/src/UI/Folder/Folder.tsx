import React, {useRef, useState} from 'react';
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

const Folder = () => {
    const history = useHistory();
    const location = history.location.pathname
    const dispatch = useDispatch();
    const cars = useSelector((state: AppStateType) => state.folderPage.ArrayFolders);
    if(cars.length===0) dispatch(setCarFromDB())
    let SortedCars = cars.slice(0);
    SortedCars.sort(function(a,b) {
        return b.Cars.length - a.Cars.length;
    });
    const {register, handleSubmit,getValues} = useForm({mode: "onBlur"});
    const [show, setShow] = useState('0');
    let cool = '';
    const folder = require("./../../img/folder.png");
    const nextPage = (id: string | number) => {
        history.push(`/folder/${id}`);
    }

    const creatFolder = (folderName: string) => {
        let newId = uuid.v4();
        let newFolder = {
            mainImg: '',
            nameOfFolder: folderName + ' - ' + newId.slice(0, 4),
            Cars: [],
        }
        dispatch(addNewFolder(newFolder));

    }
    const onSubmit = () => {
        const formValues = getValues();
        if(formValues.status.length >=1 && formValues.status.length<=99){
            dispatch(chnageNameFolderThunk(cool,formValues.status));
            setShow('0')
        }
    }
    const deleteFolder = (id:string) =>{
        dispatch(deleteFolderX(id));
    }
    return (
        <div className='MainBlockWrapper'>
            {
                SortedCars.map(m => {
                    return (<div className='Block_Wrapper' onClick={() => nextPage(m._id)}>

                            <div className='Block_content'>
                                <span className='Block_Center'>{m.Cars.length}</span>
                                <img className='Block_content-img' src={folder} alt=""/>
                                {
                                    show !== m._id && <div onClick={(e) => {
                                        e.stopPropagation();
                                        setShow(m._id)
                                    }}>{m.nameOfFolder}</div>
                                }
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <form onBlur={onSubmit}>
                                        {

                                            show === m._id &&
                                            <input className={'inputEdit'} {...register('status', { required: true})} autoFocus={true} defaultValue={m.nameOfFolder}
                                                   onBlur={() => {
                                                       cool = (m._id)
                                                   }}/>

                                        }
                                    </form>
                                </div>
                                <div>
                                <button className='deleteButtonFolder' type='button' onClick={ (e) => {e.stopPropagation(); deleteFolder(m._id); }}>Delete</button>
                                </div>
                            </div>

                        </div>

                    )
                })
            }
            {location === '/folder' &&
                <div className='Block_Wrapper' onClick={() => creatFolder('new folder')}>

                    <div className='Block_content'>
                        <div className='Circle'>
                            <span className='Block_Center-add'>+</span>
                        </div>
                        <div className='Minus'>Add Folder</div>
                    </div>

                </div>
            }
        </div>
    );
};

export default Folder;