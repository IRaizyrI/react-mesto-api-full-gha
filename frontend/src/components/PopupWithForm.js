export default function PopupWithForm({title, name, children, buttonMessage, isOpened, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpened && 'popup_is-opened'}`} onClick={onClose}>
      <button className="popup__close" type="button"></button>
      <form className="popup__container" name={name} onSubmit={onSubmit}>
      <h2 className="popup__header">{title}</h2>
      {children}
      <button className="popup__submit" type="submit">
        {buttonMessage}
      </button>
      </form>
    </div>
  )
}
