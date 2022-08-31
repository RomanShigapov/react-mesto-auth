import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputAvatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(inputAvatarRef.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      inputAvatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      name="replace-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
    >
      <fieldset className="popup__form-inputs">
        <div className="popup__form-container">
          <input
            className="popup__form-input popup__form-input_new-card-image-link"
            ref={inputAvatarRef}
            name="link"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
          <span className="popup__form-input-error link-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
