import './App.css';


import {Route, Switch} from "react-router-dom";
import {SearchingCar} from "./UI/FIRST_PAGE/SearchingCar";
import {MainPage} from "./UI/FIRST_PAGE/MainPage";
import {Header} from "./UI/Header/Header";
import React from "react";

const initProgram = () => {
    let aValue = localStorage.getItem("testObject");
    let aValue2 = localStorage.getItem("mainURL");
    if(!aValue) localStorage.setItem('testObject',JSON.stringify([]));
    if(!aValue2) localStorage.setItem('mainURL',JSON.stringify(0));
}

const App: React.FC<{}>= () => {
    initProgram();
    return (
        <div>
            <Header/>
            <Switch>
                <Route path='/show' render={() => <SearchingCar/>}/>
                <Route path='/*' render={() => <MainPage/>}/>
            </Switch>
        </div>
    )
}

export default App;
