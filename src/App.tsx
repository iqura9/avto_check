import './App.css';


import {Route, Switch} from "react-router-dom";
import {SearchingCar} from "./UI/FIRST_PAGE/SearchingCar";
import {MainPage} from "./UI/FIRST_PAGE/MainPage";
import {Header} from "./UI/Header/Header";
import React from "react";

const App: React.FC<{}>= () => {
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
