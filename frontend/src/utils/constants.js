const validationSettings ={
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};

const popupChangeProfile = document.querySelector('.popup_type_change-profile');
const popupTitle = popupChangeProfile.querySelector('.popup__input_type_title');
const popupSubtitle = popupChangeProfile.querySelector('.popup__input_type_subtitle');


const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const profileAvatar = document.querySelector('.profile__avatar-image');
const elementTemplate = document.querySelector('.element');

const popupAddElementSelector = '.popup_type_add-element';
const addElementButton = document.querySelector(popupAddElementSelector).querySelector(validationSettings.submitButtonSelector);
const popupChangeProfileSelector = '.popup_type_change-profile';
const changeProfileButton = document.querySelector(popupChangeProfileSelector).querySelector(validationSettings.submitButtonSelector);
const elementsContainerSelector = '.elements';

const popupChangeAvatarSelector = '.popup_type_change-avatar';
const changeAvatarButton = document.querySelector(popupChangeAvatarSelector).querySelector(validationSettings.submitButtonSelector);
const popupInspectImageSelector = '.popup_type_inspect-image';
const formValidators = {};
export {validationSettings,popupTitle,popupSubtitle,profileName,profileText,profileAvatar,elementTemplate,popupAddElementSelector,addElementButton,popupChangeProfileSelector,changeProfileButton,elementsContainerSelector,changeAvatarButton, popupChangeAvatarSelector,popupInspectImageSelector,formValidators}
