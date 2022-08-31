function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_picture popup_overlay-opacity_high ${
        card.isOpen && "popup_opened"
      }`}
    >
      <figure className="popup__image-container">
        <button
          onClick={onClose}
          className="popup__close-button button button_opacity_main"
          type="button"
          aria-label="кнопка закрыть просмотр изображения"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
