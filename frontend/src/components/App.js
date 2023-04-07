import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip'
import React from 'react';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import { auth } from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, useHistory, Switch, Redirect} from 'react-router-dom'

function App() {
  const history = useHistory()
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', id: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

  function handleCardClick (card){
    setSelectedCard({name: card.name, link: card.link})
    setIsImagePopupOpen(true);
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(err => console.log(err.message));
};
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
  }).catch(err => console.log(err.message));
};

function handleAuth(data, operationType) {
  const authFn = operationType === 'login' ? auth.authorization(data) : auth.registration(data);
  authFn
    .then((res) => {
      if (operationType === 'login') {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/');
      } else if (operationType === 'register') {
        history.push('/sign-in');
        setIsSuccess(true);
        handleIsInfoPopupOpen();
      }
    })
    .catch((err) => {
      setIsSuccess(false);
      handleIsInfoPopupOpen();
      console.log(err);
    });
}
React.useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    auth.checkToken(token)
      .then((res) => {
        history.push('/')
        setEmail(res.data.email);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err))
  }
}, [loggedIn, history, email])

function signOut() {
  localStorage.removeItem('token')
  setLoggedIn(false)
  setEmail('')
  history.push('/sign-in')
}

  const handleIsEditAvatarPopupOpen = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleIsInfoPopupOpen = () => {
    setIsInfoPopupOpen(true);
  };
  const handleIsAddPlacePopupOpen = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleIsEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfileOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoPopupOpen(false);
  };
  function handleCloseClickOverlay(e) {
    const elementClasslist = e.target.classList
    if (elementClasslist.contains('popup__close') || elementClasslist.contains('popup_is-opened')) {
      closeAllPopups()
    }
  }
  const isOpen =  isAddPlacePopupOpen ||  isEditAvatarPopupOpen ||  isEditProfilePopupOpen ||  isImagePopupOpen ||  isInfoPopupOpen;
  React.useEffect(() => {
    const closeByEscape =((evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    )
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
    }
    return () => {
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [isOpen])

  const handleUpdateUser = (userData) => {
    api.patchProfileInfo(userData.name, userData.about)
      .then(data => {setCurrentUser(data); closeAllPopups();})
      .catch(err => console.log(err.message));

  };
  const handleUpdateAvatar = (avatar) => {
    api.patchUserAvatar(avatar)
      .then(data => {setCurrentUser(data); closeAllPopups();})
      .catch(err => console.log(err.message));
  };
  const handleAddPlace = (cardData) => {
    api.postCard(cardData.name, cardData.link)
      .then(data => {setCards([data, ...cards]); closeAllPopups();})
      .catch(err => console.log(err.message));
  };

  React.useEffect(() => {
    if(loggedIn){
      api.getInitialCards().then(
        cards => setCards(cards))
        .catch(err => console.log(err.message));

      api.getProfileInfo()
        .then(data => setCurrentUser(data))
        .catch(err => console.log(err.message))
    }}, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <Header signOut={signOut} email={email}/>
      <Switch>
        <Route path="/sign-in">
          <Login handleLogin={handleAuth}></Login>
        </Route>
        <Route path="/sign-up">
          <Register handleRegister={handleAuth}></Register>
        </Route>
        <ProtectedRoute
          loggedIn={loggedIn}
          component={Main}
          path={'/'}
          onEditAvatar={handleIsEditAvatarPopupOpen}
          onEditProfile={handleIsEditProfileOpen}
          onAddPlace={handleIsAddPlacePopupOpen}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          />
        <Route path="*">
            <Redirect to="/sign-in"/>
        </Route>
      </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseClickOverlay} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseClickOverlay} onAddPlace={handleAddPlace}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseClickOverlay} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup card={selectedCard} onClose={handleCloseClickOverlay} isOpened={isImagePopupOpen}/>
        <InfoTooltip isOpen={isInfoPopupOpen} onClose={handleCloseClickOverlay} isSuccess={isSuccess}/>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>);
}

export default App;
