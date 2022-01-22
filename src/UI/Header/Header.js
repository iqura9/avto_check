import {NavLink} from "react-router-dom";
import './header.css';
import {connect} from "react-redux";

const Header = ({counter = 0}) =>{
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

                        </ul>
                    </nav>
                </div>
                <div className="site-header__end">
                    Counter: {counter}
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = (state) =>({
    counter: state.showPage.info.length
})
export const HeaderContainer = connect(mapStateToProps,{})(Header)