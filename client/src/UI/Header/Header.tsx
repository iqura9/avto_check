import {NavLink} from "react-router-dom";
import './header.css';
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";
import {authMeTC, deleteProfileTC} from "../../Redux/reducers/authReducer";
import Preloader from "../Preloader/Preloader";

export const Header: React.FC<{}> = () =>{
    const dispatch = useDispatch();
    const counter = useSelector<AppStateType>((state)  => state.folderPage.ArrayFolders.length);
    const isAuth = useSelector((state:AppStateType) => state.auth.email);
    if(isAuth === '' && localStorage.getItem("profile")) {dispatch(authMeTC()); return <Preloader/>}
    const LogOut = () =>{
        localStorage.removeItem('profile');
        dispatch(deleteProfileTC());
    }
    return (
        <header className="site-header">
            <div className="wrapper site-header__wrapper">
                <div className="site-header__start">
                    <a href="#" className="brand">Car's photos</a>
                </div>
                <div className="site-header__middle">
                    <nav className="nav">
                        <ul className="nav__wrapper">
                            <li className="nav__item"><NavLink activeClassName="active" to="/*">Find Car</NavLink></li>
                            <li className="nav__item"><NavLink activeClassName="active" to='/show' href="">Check Car</NavLink></li>
                            <li className="nav__item"><NavLink activeClassName="active" to='/folder' href="">Folders</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="site-header__end">
                    Folders: {counter}
                </div>
                {!isAuth ?
                <NavLink to='login'>
                    Sign in
                </NavLink>
                    :
                   <div className='logOut'>
                   <span>{isAuth}</span>
                       <div onClick={LogOut}>sign out</div>
                   </div>
                }
            </div>
        </header>
    )
}
