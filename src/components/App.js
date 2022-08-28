import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Api from '../utils/Api';
import Auth from '../utils/Auth';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardConfirmationPopup from './DeleteCardConfirmationPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import defaultAvatar from '../images/profile.jpg';

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...',
    about: '...данных',
    avatar: defaultAvatar,
    _id: ''
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardConfirmationPopupOpen, setIsDeleteCardConfirmationPopup] = useState(false);

  const [infoMessage, setInfoMessage] = useState(null);

  const [selectedCard, setSelectedCard] = useState({
      name: '',
      link: '',
      isOpen: false,
      _id: ''
  });

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteCardConfirmationPopupOpen || selectedCard.isOpen || infoMessage;

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    Api.setCardLike(card._id, !isLiked)
      .then((retCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? retCard : item));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    Api.deleteCard(card._id)
    .then((res) => {
        setCards((state) => state.filter((item) => {return item._id !== card._id;}))

        closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardConfirmationPopup(true);
    setSelectedCard(card);
  }

  function handleCardClick({name, link}) {
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true
    });
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    Api.setUserInfo({name, about})
    .then(user => {
      setCurrentUser(user);

      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    Api.setUserPic(avatar)
    .then(user => {
      setCurrentUser(user);

      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardConfirmationPopup(false);
    setInfoMessage(null);

    setSelectedCard({
      name: '',
      link: '',
      isOpen: false
    });
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    Api.addCard({ name, link })
    .then((card) => {
      setCards([card, ...cards]);

      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleRegister({email, password}) {
    Auth.register({email, password})
    .then((res) => {
      setInfoMessage({
        text: "Вы успешно зарегистрировались!",
        isSuccessful: true
      });
      history.push("/sign-in");
    })
    .catch((err) => {
      setInfoMessage({
        text: "Что-то пошло не так! Попробуйте еще раз.",
        isSuccessful: false
      });
      console.log(err);
    });
  }

  function handleLogin({ email, password }) {
    Auth.login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setInfoMessage({
          text: "Что-то пошло не так! Попробуйте еще раз.",
          isSuccessful: false
        });
        console.log(err);
      });
  }

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    Auth.checkToken(token)
    .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
  }, [history]);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  function closeByEscape(evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    checkToken()
  }, [checkToken]);

  useEffect(() => {
    Api.getUserInfo()
      .then(user => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  useEffect(() => {
    Api.getCardsList()
      .then(cards => {
        setCards([...cards])
      })
      .catch((err) => {
        console.log(err);
      })
  },[]);

  useEffect(() => {
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Switch>
        <Route path="/sign-in">
          <Login
            onLogin={handleLogin}
          />
        </Route>
        <Route path="/sign-up">
          <Register
            onRegister={handleRegister}
          />
        </Route>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />
        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <DeleteCardConfirmationPopup
        isOpen={isDeleteCardConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete}
        isLoading={isLoading}
        card={selectedCard}
      />
      <InfoTooltip
        message={infoMessage}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
