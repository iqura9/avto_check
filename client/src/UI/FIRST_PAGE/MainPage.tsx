
import React, {useEffect, useRef, useState} from "react";
import {Redirect} from "react-router-dom";
import {actions} from "../../Redux/reducers/showPageReducer";
import {useDispatch, useSelector} from "react-redux";
import {ShowImgInRow} from "./ShowImgInRow";
import {AppStateType} from "../../Redux/Redux-store";
import {adminApi} from "../../Api/Api";
import {setCarFromDB} from "../../Redux/reducers/folderPageReducer";
import Folder from "../Folder/Folder";

export const MainPage:React.FC<{}> = () => {
    const dispatch = useDispatch();
    const [yes,setYes] = useState(false);
    const [CarAvaible,setCarAvaible] = useState(false);
    useEffect(() => {
        dispatch(setCarFromDB())
        if(JSON.parse(localStorage.getItem('mainURL') || "")){
            dispatch(actions.setInitializeProgram());
            setCarAvaible(true);
        }
    },[]);

    let val = '';
    let ref = useRef<HTMLInputElement>(null);

    const sendInfo = () =>{
        dispatch(actions.changeUrl(val));
        if(ref.current && ref) ref.current.value ='';
        setYes(true);
        localStorage.setItem('mainURL', JSON.stringify(val));
    }
    const seeValue = (e:React.ChangeEvent<HTMLInputElement>) =>{val = e.target.value;}

    if(yes) return <Redirect to={"/show"}/>
    return (
        <>
        <div className='Car_app'>
            <input type="text" name='x' placeholder='type a number' ref={ref} onChange={seeValue}/>
            <button onClick={()=> sendInfo()}>Check</button>
            <div>Info about Cars</div>
        </div>
            {CarAvaible &&
                <div className='Align_NIW'>
                    <Folder/>
                </div>
            }

        </>
    );
}
