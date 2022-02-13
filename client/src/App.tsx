import './App.css';


import {Route, Switch} from "react-router-dom";
import {SearchingCar} from "./UI/FIRST_PAGE/SearchingCar";
import {MainPage} from "./UI/FIRST_PAGE/MainPage";
import {Header} from "./UI/Header/Header";
import React from "react";
import Folder from "./UI/Folder/Folder";
import FolderInfo from "./UI/Folder/folderInfo";
import {useDispatch, useSelector} from "react-redux";
import {setCarFromDB} from "./Redux/reducers/folderPageReducer";
import {AppStateType} from "./Redux/Redux-store";
import Preloader from "./UI/Preloader/Preloader";

const initProgram = () => {
    let aValue2 = localStorage.getItem("mainURL");
    if(!aValue2) localStorage.setItem('mainURL',JSON.stringify(0));
}

const App: React.FC<{}>= () => {
    const dispatch = useDispatch();
    initProgram();
    const cars = useSelector((state:AppStateType) => state.folderPage.ArrayFolders);
    if(cars.length===0) {
        dispatch(setCarFromDB())
        return <Preloader/>
    }

    return (
        <div>
            <Header/>
            <Switch>
                <Route path='/show' render={() => <SearchingCar/>}/>
                <Route exact path='/folder' render={() => <Folder/>}/>
                <Route path='/folder/:id?' render={() => <FolderInfo/>}/>
                <Route path='/*' render={() => <MainPage/>}/>
            </Switch>
        </div>
    )
}

export default App;
