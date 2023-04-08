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
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/cards`, {credentials: 'include', headers: this._headers}).then(this._checkResponse);
  }
  getProfileInfo() {
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/users/me`, {credentials: 'include', headers: this._headers}).then(this._checkResponse);
  }
  patchProfileInfo(name, about){
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
      name: name,
      about: about
      })
  }).then(this._checkResponse);
  }
  patchUserAvatar(avatar) {
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/users/me/avatar`, {
        method: "PATCH",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    }).then(this._checkResponse);
}
  postCard(name, link){
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/cards`, {
      method: "POST",
      credentials: 'include',
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
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/cards/${id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers,
    })
        .then(this._checkResponse);
  }
  putLike(id) {
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/cards/${id}/likes`, {
        method: "PUT",
        credentials: 'include',
        headers: this._headers,
    })
        .then(this._checkResponse);
}
  deleteLike(id) {
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/cards/${id}/likes`, {
        method: "DELETE",
        credentials: 'include',
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
  signOut(){
    return fetch(`https://api.logvinovilya.students.nomoredomains.monster/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const api = new Api({
  "Content-Type": "application/json",
},)
export { api }
