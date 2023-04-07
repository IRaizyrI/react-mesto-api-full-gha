import profile__avatar_icon from '../images/pen.svg';
import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
      <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar-icon" src={profile__avatar_icon} alt="редактировать"></img>
          </button>
          <img className="profile__avatar-image"  src={currentUser.avatar} alt="аватар"></img>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__text">{currentUser.about}</p>
          <button className="profile__edit" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
      {
         cards.map(card => {return (<Card card={card} key={card._id} onClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)})

      }
      </section>
    </main>)}
export default Main;
