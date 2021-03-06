import React from "react";
import Header from "./Header";
import {Link} from "react-router-dom";
import {InfoTooltip} from "./InfoTooltip";

export function Register(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [name, setName] = React.useState("");

	const resetForm = () => {
		setEmail("");
		setPassword("");
		setName("");
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.handleRegister(email, password, name);
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
									placeholder="Введите Ваше имя"
									type="name"
									className="login__item login__item_el_name"
									id="userName"
									name="name"
									required
									minLength="2"
									maxLength="40"
									value={name || ""}
									onChange={handleNameChange}
								/>
							</label>
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
