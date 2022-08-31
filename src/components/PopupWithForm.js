function PopupWithForm({
  name,
  title,
  buttonText,
  buttonLoadingText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <div
      className={`popup popup_${name} popup_overlay-opacity_main ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button button button_opacity_main"
          type="button"
          aria-label="кнопка закрыть форму редактирования профиля"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
          {children}
          <button
            className="popup__form-save-button button button_opacity_high"
            type="submit"
          >
            {isLoading ? buttonLoadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
