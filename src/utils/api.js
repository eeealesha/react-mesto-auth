

export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._response);
  }

  getUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: this.headers,
    }).then(this._response);
  }

  sendUserInfo(userName, userAbout) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(this._response);
  }

  sendUserAvatar(userAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    }).then(this._response);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._response);
  }

  postNewCard(cardName, cardLink) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._response);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._response);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._response);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._response);
  }

  changeLikeCardStatus(_id, b) {
    if (b) {
      return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
        method: "PUT",
        headers: this.headers,
      }).then(this._response);
    }
    else {
      return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
        method: "DELETE",
        headers: this.headers,
      }).then(this._response);
    }
  }

  uploadImage(base64EncodedImage) {
    return fetch(`${this.baseUrl}/api/upload`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        data: base64EncodedImage,
      })
    }).then(this._response);
  }


}

// Создаем экземпляр класса АПИ с нашими настройками
