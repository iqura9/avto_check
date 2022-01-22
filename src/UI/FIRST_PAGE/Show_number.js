
import {useEffect, useRef, useState} from "react";
import {Redirect} from "react-router-dom";
import {changeUrl, deleteIdACThunk, setInitializeProgram} from "../../Redux/reducers/showPageReducer";
import {useDispatch, useSelector} from "react-redux";
import {ShowImgInRow} from "./ShowImgInRow";

export const Show_number = (props) => {
    const info = useSelector(state => state.showPage.info);
    const dispatch = useDispatch();
    const [yes,setYes] = useState(false);
    const [CarAvaible,setCarAvaible] = useState(false);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('testObject'))){
            dispatch(setInitializeProgram());
            setCarAvaible(true);
        }else{
            localStorage.setItem('testObject', JSON.stringify(info));
        }
        if(!JSON.parse(localStorage.getItem('mainURL'))){
            localStorage.setItem('mainURL', JSON.stringify(""));
        }
    },[]);
    let val = '';
    let ref = useRef(null);
    const sendInfo = () =>{
        dispatch(changeUrl(val));
        ref.current.value ='';
        setYes(true);
        localStorage.setItem('mainURL', JSON.stringify(val));
    }
    const seeValue = (e) =>{
        val = e.target.value;
    }

    if(yes) return <Redirect to={"/show"}/>
    let retrievedObject = JSON.parse(localStorage.getItem('testObject'));
    return (
        <>
        <div className='Car_app'>
            <input type="text" name='x' placeholder='type a number' ref={ref} onChange={seeValue}/>
            <button onClick={()=> sendInfo()}>Check</button>
            <div>Info about Cars</div>
        </div>
            {CarAvaible &&
                <div className='Align_NIW'>
                    {retrievedObject.map(res => <ShowImgInRow url={res.number} deleteIdACThunk={deleteIdACThunk}/>)}
                </div>
            }

        </>
    );
}
