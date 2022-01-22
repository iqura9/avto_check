import {useState} from "react";
import {useDispatch} from "react-redux";

export const ShowImgInRow = ({url,setInitializeProgram,deleteIdACThunk,...props}) =>{
    const [vis,setVis] = useState(false);
    const dispatch = useDispatch();
    const numberMainLetter = 'f';
    let baseUrl = `https://cdn3.riastatic.com/photosnew/auto/photo/__${url}${numberMainLetter}.jpg`;
    const openBigImg = () =>{
        setVis(true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    const deleteId =()=>{
        dispatch(deleteIdACThunk(url));
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
