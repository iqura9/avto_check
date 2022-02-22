import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {chnageNameFolderThunk} from "../../Redux/reducers/folderPageReducer";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
const folder = require("./../../img/folder.png");

interface IProps{
    SortedCars: Array<any>,
    nextPage : (userId:string | number) => void,
    creatFolder : (folderName:string) => void,
    deleteFolder : (id:string) => void,
}


const ShowFolderFc:React.FC<IProps> = ({SortedCars,nextPage,creatFolder,deleteFolder}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = history.location.pathname;
    const [show, setShow] = useState('0');
    let cool = '';
    const {register, handleSubmit,getValues} = useForm({mode: "onBlur"});
    const onSubmit = () => {
        const formValues = getValues();
        if(formValues.status.length >=1 && formValues.status.length<=99){
            dispatch(chnageNameFolderThunk(cool,formValues.status));
            setShow('0')
        }
    }
    return (
            <div className='MainBlockWrapper'>
                {
                    SortedCars && SortedCars.map(m => {
                        return (<div className='Block_Wrapper' onClick={() => nextPage(m._id)}>
                                <div className='Block_content'>
                                    <span className='Block_Center'>{m.Cars?.length}</span>
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

export default ShowFolderFc;