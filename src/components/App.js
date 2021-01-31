import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";
import React from "react";
import {Api} from "../utils/api";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {Register} from "./Register";
import {Login} from "./Login";
import * as auth from "../utils/auth";

//Импортируйте этот объект в App и используйте его провайдер

import {CurrentUserContext} from "../contex/CurrentUserContext";

function App() {
	// Создаем стейт-переменную логина
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	// Создаем стейт-переменные попапов
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
		false
	); // true или false
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false); // true или false
	const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false); // true или false
	const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); // true или false
	// Создаем стейт-переменную выбранной карточки
	const [selectedCard, setSelectedCard] = React.useState(null);
	// Создайте стейт currentUser в корневом компоненте
	const [currentEmail, setCurrentEmail] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState({});
	// Создаем стейт-переменные для массива карточек
	const [cards, setCards] = React.useState([]);

	const [message, setMessage] = React.useState("");
	const [isToolTipOpen, setToolTipOpen] = React.useState(false);
	const [error, setError] = React.useState(false);

	const history = useHistory();

	const api = new Api({
		baseUrl: "http://api.eeealesha.students.nomoredomains.icu",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem("token")}`
		},
	});

	function updateInfo() {
		Promise.all([
			//в Promise.all передаем массив промисов которые нужно выполнить
			api.getInitialCards(),
			api.getUserInfo(),
		])
		.then((values) => {
			//попадаем сюда когда оба промиса будут выполнены
			const [initialCards, userData] = values;
			setCurrentUser(userData);
			initialCards.reverse();
			setCards(initialCards);
			// у нас есть все нужные данные, отрисовываем страницу
		})
		.catch((err) => {
			//попадаем сюда если один из промисов завершаться ошибкой
			console.log(err);
		});
	}

	React.useEffect(() => {
		updateInfo()
	}, [isLoggedIn]);

	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((like) => like === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api
		.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
			const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
			// Обновляем стейт
			setCards(newCards);
		})
		.catch((err) => {
			//попадаем сюда если один из промисов завершаться ошибкой
			console.log(err);
		});
	}

	function handleCardDelete(card) {
		// Снова проверяем, являемся ли мы владельцем карточки
		const isOwn = card.owner._id === currentUser._id;
		// Отправляем запрос в API и получаем обновлённые данные карточки
		console.log(card._id)
		api
		.deleteCard(card._id, !isOwn)
		.then(() => {
			// Формируем новый массив на основе имеющегося, фильтраю по номеру карточки
			const newCards = cards.filter((c) => c._id !== card._id);
			// Обновляем стейт
			setCards(newCards);
		})
		.catch((err) => {
			//попадаем сюда если один из промисов завершаться ошибкой
			console.log(err);
		});
	}

	function handleCardClick(card) {
		setSelectedCard(card);
		setImagePopupOpen(true);
	}

	function handleEditAvatar() {
		setAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}

	function handleUpdateUser({name, about}) {
		api
		.sendUserInfo(name, about)
		.then((res) => {
			setCurrentUser(res);
			closeAllPopups();
		})
		.catch((err) => console.log(err));
	}

	// function handleUploadAvatar(base64EncodedImage){
	//
	// }

	function handleUpdateAvatar(base64EncodedImage) {
		api.uploadImage(base64EncodedImage)
		.then((res) => {
			api
			.sendUserAvatar(res.url)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err))
	}

	function handleAddPlaceSubmit({name, base64EncodedImage}) {
		api.uploadImage(base64EncodedImage)
		.then((res) => {
			api
			.postNewCard(name, res.url)
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err)
		})
	}

	function closeAllPopups() {
		setAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setSelectedCard(null);
		setImagePopupOpen(false);
		setToolTipOpen(false);
	}

	function handleSignOut() {
		localStorage.removeItem("token");
		history.push("/sign-in");
		setIsLoggedIn(false);
	}

	const handleRegister = (email, password, name) => {
		setError(false);
		if (!email || !password) {
			setToolTipOpen(true);
			setError(true)
			console.log("Введите email и пароль");
		} else {
			auth
			.register(email, password, name)
			.then((res) => {
				setToolTipOpen(true);
				if (!res.message && !res.error) {
					setMessage("Вы успешно зарегистрировались!");
				} else {
					setError(true);
					setMessage(res.message || res.error);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		}
	};

	const handleLogin = (email, password) => {
		if (!email || !password) {
			setToolTipOpen(true);
			setError(true);
			setMessage("Введите email и пароль");
		} else {
			auth
			.authorize(email, password)
			.then((data) => {
				if (data === undefined) {
					setToolTipOpen(true);
					setError(true);
					setMessage("Неправильные email или пароль");
				}
				if (data.token) {
					localStorage.setItem("token", data.token)
					history.push("/");
					setIsLoggedIn(true);
				}
			})
			.catch((err) => console.log(err));
		}
	};

	const tokenCheck = () => {
		const token = localStorage.getItem("token");
		if (localStorage.getItem("token")) {
			auth
			.getContent(token)
			.then((res) => {
				if (res) {
					setCurrentUser(res)
					setCurrentEmail(res.email);
					setIsLoggedIn(true);
					history.push("/");
				} else {
					localStorage.removeItem("token");
				}
			})
			.catch((err) => console.log(err));
		}
	};

	React.useEffect(() => {
		tokenCheck();
	}, [isLoggedIn]);

	return (
		<>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					<Switch>
						<Route path="/sign-up">
							<Register
								handleRegister={handleRegister}
								error={error}
								message={message}
								isToolTipOpen={isToolTipOpen}
								onClose={closeAllPopups}
							/>
						</Route>
						<Route path="/sign-in">
							<Login handleLogin={handleLogin}
							       error={error}
							       message={message}
							       isToolTipOpen={isToolTipOpen}
							       onClose={closeAllPopups}/>
						</Route>
						<ProtectedRoute
							path="/"
							loggedIn={isLoggedIn}
							Component={
								<>
									<Header
										email={currentEmail}
										onClick={handleSignOut}
										name="Выйти"
										page="/sign-in"
									></Header>
									<Main
										cards={cards}
										onCardLike={handleCardLike}
										onCardDelete={handleCardDelete}
										onEditAvatar={handleEditAvatar}
										onAddPlace={handleAddPlaceClick}
										onEditProfile={handleEditProfileClick}
										onCardClick={handleCardClick}
									/>
								</>
							}
						/>
						<Route exact path="/">
							{isLoggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
						</Route>
					</Switch>
					<Footer/>
					<EditProfilePopup
						onUpdateUser={handleUpdateUser}
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
					/>
					<EditAvatarPopup
						onUpdateAvatar={handleUpdateAvatar}
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
					/>
					<AddPlacePopup
						onAddPlace={handleAddPlaceSubmit}
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
					/>
					<PopupWithForm
						onClose={closeAllPopups}
						title="Вы уверены?"
						name="confirm"
						buttonText="Да"
					/>
					<ImagePopup
						onClose={closeAllPopups}
						isOpen={isImagePopupOpen}
						card={selectedCard}
					/>
				</div>
			</CurrentUserContext.Provider>
		</>
	);
}

export default App;
