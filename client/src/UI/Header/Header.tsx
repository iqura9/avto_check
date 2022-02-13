import {NavLink} from "react-router-dom";
import './header.css';
import {useSelector} from "react-redux";
import React from "react";
import {AppStateType} from "../../Redux/Redux-store";

export const Header: React.FC<{}> = () =>{
    const counter = useSelector<AppStateType>((state)  => state.folderPage.ArrayFolders.length);
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
            </div>
        </header>
    )
}
