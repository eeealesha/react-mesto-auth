import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';
import Footer from "./Footer";
import Header from "./Header";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../utils/auth';


export function Login(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();
    const [login, setLogin]= React.useState("");
    const [email, setEmail]= React.useState("");
    const [password, setPassword]= React.useState("");
    const [message, setMessage]= React.useState("");

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setMessage('')
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
            return
        }
        auth.authorize(email, password)
            .then((data)=>{
                console.log(data);
                if (data === undefined) {
                    console.log("Нет такого пользователя")
                }
                if (data.token) {
                    resetForm();
                    props.handleLogin();
                    history.push('/');
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
