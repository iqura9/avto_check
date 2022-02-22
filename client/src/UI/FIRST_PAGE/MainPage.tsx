import React, {useEffect, useRef, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {actions} from "../../Redux/reducers/showPageReducer";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Folder from "../Folder/Folder";

export const MainPage: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const [yes, setYes] = useState(false);
    const [CarAvaible, setCarAvaible] = useState(true);
    const history = useHistory();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('mainURL') || "")) {
            dispatch(actions.setInitializeProgram());
        }
    }, []);

    let val = '';
    let ref = useRef<HTMLInputElement>(null);

    const sendInfo = () => {
        dispatch(actions.changeUrl(val));
        if (ref.current && ref) ref.current.value = '';
        setYes(true);
        localStorage.setItem('mainURL', JSON.stringify(val));
    }
    const seeValue = (e: React.ChangeEvent<HTMLInputElement>) => val = e.target.value;

    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true});
    const onSubmit = async (data: any) => {
        if(data.favShow === 'Array'){
            history.push({
                pathname: `/show/array/${data.number}`
            });
        }else{
            history.push({
                pathname: `/show/${data.number}`
            });
        }
    };
    if (yes) return <Redirect to={"/show"}/>
    return (
        <>
            <form className='Car_app' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='type a number' {...register("number")}/>
                <div className='radio_buttons'>
                <label htmlFor="got">
                    <input
                        {...register('favShow', {required: true})}
                        type="radio"
                        name="favShow"
                        value="oneCar"
                        className="form-check-input"
                        id="got"
                    />{' '}
                    <span>Одна машина</span>
                </label>
                <label htmlFor="breadking-bad">
                    <input defaultChecked={true}
                        {...register('favShow', {required: true})}

                        type="radio"
                        name="favShow"
                        value="Array"
                        className="form-check-input"
                        id="breadking-bad"
                    />
                    <span>Список машин</span>
                </label>
                </div>
                <button>Check</button>
                <div>Info about Cars</div>
            </form>
            {CarAvaible &&
                <div className='Align_NIW'>
                    <Folder seeAll={true}/>
                </div>
            }
            {/*добавити якщо роль адмін, але спочатку в апі*/}

        </>
    );
}
