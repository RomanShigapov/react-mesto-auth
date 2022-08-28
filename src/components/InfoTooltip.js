function InfoTooltip({message, onClose}) {
  return (
    <div className={`popup popup_info-tooltip popup_overlay-opacity_main ${message && "popup_opened"}`}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close-button button button_opacity_main" type="button" aria-label="кнопка закрыть просмотр ответа"></button>
        <div className={`popup__icon ${message?.isSuccessful? "popup__icon_type_success" : "popup__icon_type_failure"}`}>
        </div>
        <h2 className="popup__title popup__title-tooltip">{message?.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
