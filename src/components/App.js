import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";
import React from 'react';
import {api} from "../utils/api";
import {EditProfilePopup} from './EditProfilePopup';
import {EditAvatarPopup} from './EditAvatarPopup';
import {AddPlacePopup} from "./AddPlacePopup";
import {Switch, Route, useHistory, Link} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import {Register} from './Register';
import {Login} from "./Login";
import * as auth from '../utils/auth';
import {InfoTooltip} from './InfoTooltip';
//Импортируйте этот объект в App и используйте его провайдер

import {CurrentUserContext} from '../contex/CurrentUserContext';



function App() {
    // Создаем стейт-переменную логина
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // Создаем стейт-переменные попапов
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false); // true или false
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false); // true или false
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false); // true или false
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); // true или false
    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false); // true или false
    // Создаем стейт-переменную выбранной карточки
    const [selectedCard, setSelectedCard] = React.useState(null);
    // Создайте стейт currentUser в корневом компоненте
    const [currentEmail, setCurrentEmail] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    // Создаем стейт-переменные для массива карточек
    const [cards, setCards] = React.useState([]);

    const history = useHistory();

    React.useEffect(() => {
        Promise.all([
            //в Promise.all передаем массив промисов которые нужно выполнить
            api.getInitialCards(),
            api.getUserInfo()
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
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
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
        api.deleteCard(card._id, !isOwn).then(() => {
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

    function handleInfoToolTip() {
        setInfoToolTipOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true)
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
        api.sendUserInfo(name, about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar({avatar}) {

        api.sendUserAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit({name, link}) {
        api.postNewCard(name, link)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))

    }

    function closeAllPopups() {
        setAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setImagePopupOpen(false);
    }

    function handleLogin() {
        setIsLoggedIn(true);
    }

    function handleSignOut(){
        localStorage.removeItem('token')
        history.push('/sign-in');
        setIsLoggedIn(false);
    }

    const tokenCheck = () => {
        if(localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            auth.getContent(token).then((res)=>{
                if(res){
                    console.log(res.data);
                    setIsLoggedIn(true);
                    setCurrentEmail(res.data.email);
                }
            })
        }
    }

    React.useEffect(()=>{
        tokenCheck();
        if (isLoggedIn){
            history.push('/');
        }
    },[isLoggedIn])

    return (
        //«оберните» в него всё текущее содержимое корневого компонента
        //В качестве значения контекста для провайдера используйте currentUser
        <>
        <Switch>
            <Route path="/sign-up">
                <Register handleInfoToolTip={handleInfoToolTip} />
                <InfoTooltip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} isLoggedIn={isLoggedIn}></InfoTooltip>
            </Route>
            <Route path="/sign-in">
                <Login handleInfoToolTip={handleInfoToolTip} handleLogin={handleLogin}/>
                <InfoTooltip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} isLoggedIn={isLoggedIn}></InfoTooltip>
            </Route>
            <ProtectedRoute path='/'
                            loggedIn={isLoggedIn}
                            Component={
                                (<CurrentUserContext.Provider value={currentUser}>
                                <div className="page">
                                    <Header>
                                        <div className="login__wrapper">
                                            <p className="login__text">
                                                {currentEmail}
                                                <a onClick={handleSignOut} type="button" className="login__link login__link_header"> Выйти</a>
                                            </p>
                                        </div>
                                    </Header>
                                <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                onEditAvatar={handleEditAvatar} onAddPlace={handleAddPlaceClick}
                                onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/>
                                <Footer/>
                                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}/>
                                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}/>
                                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}/>
                                <PopupWithForm onClose={closeAllPopups} title='Вы уверены?' name='confirm' buttonText='Да'/>
                                <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
                                <InfoTooltip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} isLoggedIn={isLoggedIn}></InfoTooltip>
                                </div>
                                </CurrentUserContext.Provider>)

            } />
        </Switch>
        </>
    );
}

export default App;
