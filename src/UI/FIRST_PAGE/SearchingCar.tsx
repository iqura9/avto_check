import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {actions, sendThunka} from "../../Redux/reducers/showPageReducer";
import {AppStateType} from "../../Redux/Redux-store";
import {useForm} from "react-hook-form";
import {setCarToFolderThunk} from "../../Redux/reducers/folderPageReducer";
let imgNotFound ='https://clients.cylindo.com/viewer/3.x/v3.0/documentation/img/not_found.gif';

export const SearchingCar: React.FC<{}> = () => {

    const numberMain:number | string= useSelector((state:AppStateType) => state.showPage.MainNumberURL);
    const foldersName = useSelector( (state:AppStateType) => state.folderPage.ArrayFolders);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const onSubmit = async (data:any) => {dispatch(setCarToFolderThunk(data.folders, Number(inx)));};

    const [inx, setInx] = useState<number | string>(numberMain);
    const [error, setError] = useState(false);
    useEffect(() => {
        dispatch(actions.setInitializeProgram());
        setInx(numberMain);
    },[numberMain]);
    let x;
    const changeMinus = () => {
        x = Number(inx) - 1;
        setInx(x);
        localStorage.setItem('mainURL', JSON.stringify(x));
    }
    const changePlus = () => {
        x = Number(inx) + 1;
        setInx(x);
        localStorage.setItem('mainURL', JSON.stringify(x));
    }
    const addToLocalStorage = () =>{
        dispatch(sendThunka(Number(inx)));
    }
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${inx}f.jpg`;

    if (error) return <Redirect to='/404'/>
    return (
        <>
            <form className='Car_app' onSubmit={handleSubmit(onSubmit)} >
                <img className='Car_app_IMG' src={inx ? baseUrl : imgNotFound} />
                <div className='Car_app_align_button'>
                    <button type='button' onClick={() => changeMinus()}>Left</button>
                    <button type="submit" onClick={() => addToLocalStorage()}>Add</button>
                    <button type='button' onClick={() => changePlus()}>Right</button>
                </div>
                <div className='findNewCar'>
                    <button type='button' onClick={() => setError(true)}>Find Another Car</button>
                    <select className='Car_Folder_selector' {...register("folders")}>
                        {foldersName.map( m=> {
                            return  <option value={m.folderId}>{m.nameOfFolder}</option>
                        })}

                    </select>

                </div>
            </form>
        </>
    );
}