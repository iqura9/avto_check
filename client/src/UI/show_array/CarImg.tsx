import React from 'react';
import {folderX} from "./ShowArray";
import {setCarToFolderThunk} from "../../Redux/reducers/folderPageReducer";
import {useDispatch} from "react-redux";


interface propsType {
    id:number
}
const CarImg:React.FC<propsType> = ({id}) => {
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${id}f.jpg`;
    const dispatch = useDispatch();
    const add = (folderX:string, carId:number) =>{
        dispatch(setCarToFolderThunk(folderX,carId))
    }
    return (
        <div className='Car_flex'>
            <img className='Car_small_img' src={baseUrl} alt=""/>
            <button onClick={()=> add(folderX,id)}>ADD TO THE FOLDER</button>
        </div>
    );
};

export default CarImg;