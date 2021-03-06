import React from "react";
import Header from "./Header";
import {InfoTooltip} from "./InfoTooltip";

export function Login(props) {
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
    props.handleLogin(email, password);
    resetForm();
  };

  return (
    <>
      <Header name={"Регистрация"} page={"/sign-up"}></Header>
      <main className="login">
        <section className="login__register">
          <form
            onSubmit={handleSubmit}
            className="login__form"
            name="register"
            noValidate
          >
            <h2 className="login__title">Вход</h2>
            <fieldset className="login__field">
              <label className="login__label">
                <input
                  placeholder="Введите Ваш email"
                  type="email"
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
                  placeholder="Введите Ваш пароль"
                  type="password"
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
              <button className="button button_type_login">Войти</button>
            </fieldset>
          </form>
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
