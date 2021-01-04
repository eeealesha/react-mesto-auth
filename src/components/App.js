import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Register } from "./Register";
import { Login } from "./Login";
import * as auth from "../utils/auth";
//Импортируйте этот объект в App и используйте его провайдер

import { CurrentUserContext } from "../contex/CurrentUserContext";

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

  React.useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getInitialCards(),
      api.getUserInfo(),
    ])
      .then((values) => {
        //попадаем сюда когда оба промиса будут выполнены
        const [initialCards, userData] = values;
        setCards(initialCards);
        setCurrentUser(userData);
        // у нас есть все нужные данные, отрисовываем страницу
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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

  function handleUpdateUser({ name, about }) {
    api
      .sendUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .sendUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
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

  const handleRegister = (email, password) => {
    setError(false);
    if (!email || !password) {
      console.log("Введите email и пароль");
    }
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
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
    setToolTipOpen(true);
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      console.log("Введите email и пароль");
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data === undefined) {
          console.log("Нет такого пользователя");
        }
        if (data.token) {
          tokenCheck();
          setIsLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentEmail(res.data.email);
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

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
              <Login handleLogin={handleLogin} />
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
          </Switch>
          <Footer />
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
