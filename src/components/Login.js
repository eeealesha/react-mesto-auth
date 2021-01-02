import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';
import Footer from "./Footer";
import Header from "./Header";
import {Link} from 'react-router-dom';


export function Login(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    // добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
    const [login, setLogin]= React.useState("");
    const [email, setEmail]= React.useState("");
    const [password, setPassword]= React.useState("");
    const [message, setMessage]= React.useState("");

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); 
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        // e.preventDefault();
        // // Передаём значения управляемых компонентов во внешний обработчик
        // props.onUpdateUser({
        //     name,
        //     about: description,
        // });
    }
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    // React.useEffect(() => {
    //     setName(currentUser.name);
    //     setDescription(currentUser.about);
    // }, [currentUser]);

    return (
        <>
            <div className='page'>
                <Header>
                    <Link to="sign-up" className="login__link login__link_header">Регистрация</Link>
                </Header>
                <main className='login'>
                    <section className="login__register">
                        <form onSubmit={props.onSubmit} className="login__form" name="register" noValidate>
                            <h2 className="login__title">Вход</h2>
                            <fieldset className="login__field">
                                <label className="login__label">
                                    <input
                                        placeholder="e-mail"
                                        type="text"
                                        className="login__item login__item_el_name"
                                        id="e-mail"
                                        name="e-mail"
                                        required
                                        minLength="2"
                                        maxLength="40"
                                        value={login || ''}
                                        onChange={handleLoginChange}
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
