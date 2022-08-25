import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page-section">
      <section className="profile" aria-label="Секция профиля пользователя">
        <button onClick={onEditAvatar} className="profile__replace-avatar" type="button">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={onEditProfile} className="profile__edit-button button button_opacity_main" type="button" aria-label="вызов формы редактирования профиля"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
          <button onClick={onAddPlace} className="profile__add-button button button_opacity_main" type="button" aria-label="выхов формы добавления карточки места"></button>
      </section>
      <section className="places" aria-label="Секция карточек мест">
        <ul className="places__grid-items">
          {cards.map(card => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
