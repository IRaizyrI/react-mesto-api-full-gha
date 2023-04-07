function ImagePopup({card, onClose, isOpened}) {
  return (
  <div className={`popup popup_type_inspect-image  ${isOpened && 'popup_is-opened'}`} onClick={onClose}>
    <button className="popup__close" type="button" onClick={onClose}/>
    <img className="popup__image" src={card.link} alt={card.name}/>
    <p className="popup__image-description">{card.name}</p>
  </div>)
}
export default ImagePopup;
