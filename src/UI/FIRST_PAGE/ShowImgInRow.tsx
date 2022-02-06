import React, {useState} from "react";
import {useDispatch} from "react-redux";

interface PropsType{
    url: number,
    deleteIdACThunk?: (url:number) => void,
    deleteNew?: (folderID:string, productID:string) => void,
    folderID? :string,
    productID? :string,
}

export const ShowImgInRow:React.FC<PropsType> = ({url,deleteIdACThunk,deleteNew,folderID,productID,...props}) =>{
    const [vis,setVis] = useState<boolean>(false);
    const dispatch = useDispatch();
    const numberMainLetter = 'f';
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${url}${numberMainLetter}.jpg`;
    const openBigImg = () =>{
        setVis(true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    const deleteId =()=>{
        if(deleteIdACThunk) dispatch(deleteIdACThunk(url));
        else if(deleteNew) {
            if(folderID && productID)
            dispatch(deleteNew(folderID,productID));
        }
    }
    return (
        <div className='Change_width'>
            <span onClick={() => openBigImg()}>
                <img src={baseUrl} alt=""/>
            </span>
            <button onClick={ () => deleteId()}>delete</button>
            {vis &&
                <div className='big_img'>
                    <img src={baseUrl} alt=""/>
                    <div className="nsxs">
                        <button onClick={() => setVis(false)}>Close</button>
                    </div>
                </div>
            }
        </div>
    )
}
