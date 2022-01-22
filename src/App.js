import './App.css';


import {Route, Switch} from "react-router-dom";
import {Type_number} from "./UI/FIRST_PAGE/type_number";
import {Show_number} from "./UI/FIRST_PAGE/Show_number";
import {HeaderContainer} from "./UI/Header/Header";


const App = () => {
    return (
        <div>
            <HeaderContainer/>
            <Switch>
                <Route path='/show' render={() => <Type_number/>}/>
                <Route path='/*' render={() => <Show_number/>}/>
            </Switch>

        </div>
    )
}

export default App;
