import React from 'react';
import {useForm} from "react-hook-form";
import {NavLink, useHistory} from "react-router-dom";
import './styleForLoginForm.css'
import {useDispatch} from "react-redux";
import {authMeTC, loginTC} from "../../Redux/reducers/authReducer";
const Login: React.FC<{}> = () => {

    // get functions to build form with useForm() hook
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const history = useHistory();
    const dispatch = useDispatch();



    function onSubmit(data:any) {
      dispatch(loginTC(data,history));
    }
    dispatch(authMeTC());
    if(localStorage.getItem("profile")) history.push({pathname: '/'});
    return (
        <div className="Content">
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" {...register('email')}
                                   className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" {...register('password')}
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className='button-list'>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <NavLink to="/account/register" className="btn btn-link">Register</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default Login;