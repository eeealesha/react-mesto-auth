import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';
import Footer from "./Footer";
import Header from "./Header";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../utils/auth';
import {InfoTooltip} from './InfoTooltip';

export function Login(props) {

    const history = useHistory();

    const [email, setEmail]= React.useState("");
    const [password, setPassword]= React.useState("");

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            console.log('Введите email и пароль');
        }
        auth.authorize(email, password)
            .then((data)=>{
                if (data === undefined) {
                    console.log('Нет такого пользователя');
                }
                if (data.token) {
                    history.push('/');
                    resetForm();
                    props.handleLogin();
                }
            })
            .catch(err=>console.log(err));
    }

    return (
        <>
            <div className='page'>
                <Header>
                    <Link to="sign-up" className="login__link login__link_header">Регистрация</Link>
                </Header>
                <main className='login'>
                    <section className="login__register">
                        <form onSubmit={handleSubmit} className="login__form" name="register" noValidate>
                            <h2 className="login__title">Вход</h2>
                            <fieldset className="login__field">
                                <label className="login__label">
                                    <input
                                        placeholder="Email"
                                        type="text"
                                        className="login__item login__item_el_name"
                                        id="email"
                                        name="email"
                                        required
                                        minLength="2"
                                        maxLength="40"
                                        value={email || ''}
                                        onChange={handleEmailChange}
                                    />
                                </label>
                                <label className="login__field">
                                    <input
                                        placeholder="password"
                                        type="text"
                                        className="login__item login__item_el_job"
                                        id="password"
                                        name="password"
                                        required
                                        minLength="2"
                                        maxLength="200"
                                        value={password || ''}
                                        onChange={handlePasswordChange}
                                    />
                                </label>
                                <button className="button button_type_login">Войти</button>
                            </fieldset>
                        </form>
                    </section>
                </main>
                <Footer/>
            </div>
        </>
    )

}
