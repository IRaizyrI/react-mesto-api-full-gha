import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useRef } from "react";
export default function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    e.target.reset();
  }
  return (
    <PopupWithForm isOpened={isOpen} title="Обновить аватар" name="change-avatar" buttonMessage="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input type="url" name="avatar_link" className="popup__input popup__input_type_link" id="popup__input-change-avatar" ref={avatarRef} placeholder="Ссылка на картинку" required></input>
      <span className="popup__input-error" id="popup__input-change-avatar-error"></span>
    </PopupWithForm>
  )
}
