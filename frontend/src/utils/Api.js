export class Api{
  constructor(headers){
    this._headers = headers
  }
  _checkResponse(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Бип-Буп-Бип! Что-то пошло не так. Статус: ${res.status}`)
  }
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards`, {headers: this._headers}).then(this._checkResponse);
  }
  getProfileInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me`, {headers: this._headers}).then(this._checkResponse);
  }
  patchProfileInfo(name, about){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
      name: name,
      about: about
      })
  }).then(this._checkResponse);
  }
  patchUserAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    }).then(this._checkResponse);
}
  postCard(name, link){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(
        {
          name: name,
          link: link
        }
      ),
  }).then(this._checkResponse);
}
  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
        .then(this._checkResponse);
  }
  putLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
    })
        .then(this._checkResponse);
}
  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
    })
        .then(this._checkResponse);
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
        return this.putLike(id);
    } else {
        return this.deleteLike(id);
    }
  }
}

const api = new Api({
  authorization: 'f20963a7-7d81-4b3c-bd7d-ee113d720791',
  "Content-Type": "application/json",
},)
export { api }
