import {authOptions} from './Utils';

class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _useServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  register({ email, password }) {
    return fetch(
      `${this._baseUrl}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          email,
          password
        })
      }
    )
    .then(res => this._useServerResponse(res));
  }

  login({ email, password }) {
    return fetch(
      `${this._baseUrl}/signin`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          email,
          password
        })
      }
    )
    .then(res => this._useServerResponse(res));
  }

  checkToken(token) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${token}`
        }
      }
    )
    .then(res => this._useServerResponse(res));
  }

}

export default new Auth(authOptions);
