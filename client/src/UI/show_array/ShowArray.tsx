import React, {useState} from 'react';
import './showarray.css'
import {useHistory, useParams} from "react-router-dom";
import CarImg from "./CarImg";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
export let folderX ='';
const ShowArray = () => {
    const {id} = useParams<{id:string}>();
    const [folder, setFolder] = useState<string>();
    const history = useHistory();
    let len = 0;
    const queryString = require('query-string');
    const {filter} = queryString.parse(history.location.search);
    if(!filter) history.push({
        pathname: `/show/array/${id}`,
        search: `filter=10`
    })
    len = Number(id)+Number(filter);
    let i:number;
    let q = [];
    for(i = Number(id) ; i<len ;i++) q.push(i);


    const { register, handleSubmit } = useForm();
    const foldersName = useSelector( (state:AppStateType) => state.folderPage.ArrayFolders);
    let SortedCars = foldersName.slice(0);
    SortedCars.sort(function(a,b) {
        return b.Cars.length - a.Cars.length;
    });
    return (<>
        <div className='flew_row'>
        <select className='select_car' {...register("filter")} onChange={(e)=>history.push({
            pathname: `/show/array/${id}`,
            search: `filter=${e.target.value}`
        })}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
        </select>
        <select className='select_folder' {...register("filter2")}  onChange={(e)=> folderX=(e.target.value)}>
            <option value="none" selected disabled hidden>Select an Option</option>
            {SortedCars.map( m=> {
                return  <option value={m._id}>{m.nameOfFolder}</option>
            })}
        </select>
        </div>
        <div className='Show_Cars'>
            {q.map(m=> <CarImg id={Number(m)}/>)}
        </div>
</>);
};

export default ShowArray;