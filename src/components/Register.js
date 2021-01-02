import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';
import Footer from "./Footer";
import Header from "./Header";
import {Link} from 'react-router-dom';


export function Register(props) {
    // Подписка на контекст
    // const currentUser = React.useContext(CurrentUserContext);
    // добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
    const [login, setLogin]= React.useState("");
    const [password, setPassword]= React.useState("");
    const [isOpen] = React.useState(true)
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
                <Link to="sign-in" className="login__link login__link_header">Войти</Link>
            </Header>
            <main className='login'>
            <section className="login__register">
                <form onSubmit={props.onSubmit} className="login__form" name="register" noValidate>
                    <h2 className="login__title">Регистрация</h2>
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
