import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { InfoTooltip } from "./InfoTooltip";

export function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister(email, password);
    resetForm();
  };

  return (
    <>
      <Header name={"Войти"} page={"/sign-in"}></Header>
      <main className="login">
        <section className="login__register">
          <form
            onSubmit={handleSubmit}
            className="login__form"
            name="register"
            noValidate
          >
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
                  value={email || ""}
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
                  value={password || ""}
                  onChange={handlePasswordChange}
                />
              </label>
              <button className="button button_type_login">
                Зарегистрироваться
              </button>
            </fieldset>
          </form>
          <div className="login__wrapper">
            <p className="login__text">
              Уже зарегистрированы?
              <Link to="sign-in" className="login__link">
                {" "}
                Войти
              </Link>
            </p>
          </div>
        </section>
      </main>
      <InfoTooltip
        onClose={props.onClose}
        isOpen={props.isToolTipOpen}
        error={props.error}
        message={props.message}
      ></InfoTooltip>
    </>
  );
}
