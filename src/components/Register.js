import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';
import Footer from "./Footer";
import Header from "./Header";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../utils/auth';

export function Register(props) {
    // Подписка на контекст
    // const currentUser = React.useContext(CurrentUserContext);
    // добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
    const history = useHistory();
    const [email, setEmail]= React.useState("");
    const [password, setPassword]= React.useState("");
    const [message, setMessage]= React.useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
       e.preventDefault();
       auth.register(email,password).then((res) => {
           if (res.statusCode !== 400) {
               setMessage('');
               history.push('/sign-in');
           }
           else {
               setMessage('Что-то пошло не так')
           }
        })

    }

    return (
       <>
        <div className='page'>
            <Header>
                <Link to="sign-in" className="login__link login__link_header">Войти</Link>
            </Header>
            <main className='login'>
            <section className="login__register">
                <form onSubmit={handleSubmit} className="login__form" name="register" noValidate>
                    <h2 className="login__title">Регистрация</h2>
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
                        <button className="button button_type_login">Зарегистрироваться</button>
                    </fieldset>
                </form>
                <div className="login__wrapper">
                    <p className="login__text">
                        Уже зарегистрированы?
                        <Link to="sign-in" className="login__link"> Войти</Link>
                    </p>
                </div>
            </section>
            </main>
            <Footer/>
        </div>
       </>
    )

}
