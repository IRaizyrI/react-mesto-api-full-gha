import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react';
function Card(props){
  const card = props.card;
  const handleClick = () => {
    props.onClick(props.card);
  };
  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked && 'element__button-like_active'}`
  );;
  return(
    <div className="element">
    <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}></img>
    {isOwn && <button className='button element__button-delete' onClick={handleDeleteClick}/>}
    <div className="element__caption">
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <p className="element__like-counter">{card.likes.length}</p>
      </div>
    </div>
  </div>
  )
}
export default Card;
