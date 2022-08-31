import { apiOptions } from "./Utils";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _useServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._useServerResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._useServerResponse(res));
  }

  deleteCard(сardId) {
    return fetch(`${this._baseUrl}/cards/${сardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._useServerResponse(res));
  }

  setCardLike(сardId, like) {
    return fetch(`${this._baseUrl}/cards/likes/${сardId}`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._useServerResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._useServerResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._useServerResponse(res));
  }

  setUserPic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._useServerResponse(res));
  }
}

export default new Api(apiOptions);
