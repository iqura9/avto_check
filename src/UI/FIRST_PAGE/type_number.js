import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {sendThunka, setInitializeProgram} from "../../Redux/reducers/showPageReducer";
let imgNotFound ='https://clients.cylindo.com/viewer/3.x/v3.0/documentation/img/not_found.gif';

export const Type_number = () => {

    const numberMain = useSelector(state => state.showPage.MainNumberURL);
    const dispatch = useDispatch();
    const [inx, setInx] = useState(numberMain);
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(setInitializeProgram());
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
        dispatch(sendThunka(inx));
    }
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${inx}f.jpg`;

    if (error) return <Redirect to='/404'/>
    return (
        <>
            <div className='Car_app'>
                <img className='Car_app_IMG' src={inx ? baseUrl : imgNotFound} />
                <div className='Car_app_align_button'>
                    <button onClick={() => changeMinus()}>Left</button>
                    <button onClick={() => addToLocalStorage()}>Add</button>
                    <button onClick={() => changePlus()}>Right</button>

                </div>
                <div className='findNewCar'>
                    <button onClick={() => setError(true)}>Find Another Car</button>
                </div>


            </div>
        </>
    );
}