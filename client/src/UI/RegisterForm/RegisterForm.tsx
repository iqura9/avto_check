import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {loginTC, registerTC} from "../../Redux/reducers/authReducer";
import {useDispatch} from "react-redux";

const RegisterForm = () => {

    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const dispatch = useDispatch();
    const history = useHistory();
    function onSubmit(data:any) {
       dispatch(registerTC(data,history));
    }
    if(localStorage.getItem("profile")) history.push({pathname: '/'});
    return (
        <div className="Content">
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" {...register('email')}/>
                        </div>

                        <div className="form-group">
                            <label>firstName</label>
                            <input type="text" {...register('firstName')}/>
                        </div>
                        <div className="form-group">
                            <label>lastName</label>
                            <input type="text" {...register('lastName')}/>
                        </div>
                        <div className="form-group">
                            <label>phone</label>
                            <input type="text" {...register('phone')}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" {...register('password')}/>
                        </div>
                        <div className='button-list'>
                            <button disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <NavLink to="login">login</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;