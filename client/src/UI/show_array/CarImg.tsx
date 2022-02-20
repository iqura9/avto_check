import React from 'react';
import {folderX} from "./ShowArray";
import {setCarToFolderThunk} from "../../Redux/reducers/folderPageReducer";
import {useDispatch} from "react-redux";


interface propsType {
    id:number
}
const CarImg:React.FC<propsType> = ({id}) => {
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${id}f.jpg`;
    const noFound = `https://ksoe.com.ua/assets/48ff900a/no-image.jpg`;
    const dispatch = useDispatch();
    const add = (folderX:string, carId:number) =>{
        dispatch(setCarToFolderThunk(folderX,carId))
    }
    return (
        <div className='Car_flex'>
            <img className='Car_small_img' src={baseUrl} onError={ ({currentTarget}) => currentTarget.src=`${noFound}`} alt=""/>
            <button onClick={()=> add(folderX,id)}>ADD TO THE FOLDER</button>
        </div>
    );
};

export default CarImg;