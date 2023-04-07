import PopupWithForm from "./PopupWithForm";
import React from "react";
export default function EditProfilePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  return (
  <PopupWithForm isOpened={isOpen} title="Новое место" name="add-element" buttonMessage="Создать" onClose={onClose} onSubmit={handleSubmit}>
    <input className="popup__input popup__input_type_name" type="text" id="popup__input-place" placeholder="Название" name="popup__name" value={name} onChange={handleChangeName} minLength="2" maxLength="200" required></input>
    <span className="popup__input-error" id="popup__input-place-error">test</span>
    <input className="popup__input popup__input_type_link" type="url" id="popup__input-place-link" placeholder="Ссылка на картинку" value={link} onChange={handleChangeLink} name="popup__link" required></input>
    <span className="popup__input-error" id="popup__input-place-link-error">test</span>
  </PopupWithForm>
  )
}
