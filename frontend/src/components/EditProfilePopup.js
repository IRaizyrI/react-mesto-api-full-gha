import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpened={isOpen} title="Редактировать профиль" name="change-profile" buttonMessage="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_title" type="text" id="popup__input-name" placeholder="Имя" value={name} onChange={handleChangeName}  name="name" minLength="2" maxLength="40" required></input>
      <span className="popup__input-error" id="popup__input-name-error">test</span>
      <input className="popup__input popup__input_type_subtitle" type="text" id="popup__input-bio" placeholder="О себе" value={description} onChange={handleChangeDescription}  name="about" minLength="2" maxLength="200" required></input>
      <span className="popup__input-error" id="popup__input-bio-error">test</span>
    </PopupWithForm>
  )
}
