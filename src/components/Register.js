import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../utils/auth';
import {InfoTooltip} from "./InfoTooltip";

export function Register() {
    const history = useHistory();
    const [email, setEmail]= React.useState("");
    const [password, setPassword]= React.useState("");
    const [message, setMessage]= React.useState("");
    const [isToolTipOpen, setToolTipOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        setError(false);
       e.preventDefault();
        if(!email || !password){
            console.log('Введите email и пароль');
        }
       auth.register(email,password).then((res) => {
           console.log(email)
           console.log(password)
           console.log(res)
           if (res === 400) {
               setToolTipOpen(true);
               setMessage('Вы успешно зарегистрировались!');
           }
           else {
               setError(true);
               setMessage('Что-то пошло не так!\n' +
                   'Попробуйте ещё раз.')
               setToolTipOpen(true);
           }
        })

    }

    const onClose = () =>{
        setToolTipOpen(false);
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
           <InfoTooltip onClose={onClose} isOpen={isToolTipOpen} error={error} message={message}></InfoTooltip>
       </>
    )

}
