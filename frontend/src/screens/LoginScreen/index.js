import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/userActions';

import FormField from '../../components/FormField';
import classes from './LoginScreen.module.css';

const LoginScreen = (props) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const formConfig = {
        email: {
            type: 'input',
            config: { type: "email", placeholder: 'Your Email' },
        },
        password: {
            type: 'input',
            config: { type: "text", placeholder: 'Your Password' },
        },
    };

    const formElements = [];
    for (let key in formState) {
        formElements.push({ id: key, setup: formConfig[key], value: formState[key] });
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        formElements.forEach((formElement) => {
            if (inputIdentifier === formElement.id) {
                setFormState({
                    ...formState,
                    [inputIdentifier]: event.target.value,
                })
            }
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(formState.email, formState.password));
    };

    // Check if login success
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            history.push('/admin');
        }
    }, [userInfo, history]);

    return (
        <div className={classes.screen_container}>
            <form onSubmit={submitHandler}>
                <h2>Login</h2>
                {formElements.map(formElement => (
                    <FormField
                        key={formElement.id}
                        type={formElement.setup.type}
                        config={formElement.setup.config}
                        value={formElement.value}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default LoginScreen;