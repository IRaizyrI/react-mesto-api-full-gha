class Auth {
  constructor() {
    this._baseURL = 'https://api.logvinovilya.students.nomoredomains.monster'
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    }
  }
  _checkResponse(res){
    if(res.ok){
      return res.json()
    }
    console.log(res);
    return Promise.reject(`Бип-Буп-Бип! Что-то пошло не так. Статус: ${res.status} ${res}`)
  }
  authorization(data) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
      .then(this._checkResponse)
  }
  registration(data) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
    .then(this._checkResponse)
  }

  checkToken() {
    return fetch(`${this._baseURL}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse)
  }
}
const auth = new Auth();
export { auth }
