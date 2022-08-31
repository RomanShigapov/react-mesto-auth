import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    about: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(values);
  }

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (isOpen) {
      setValues(currentUser);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
    >
      <fieldset className="popup__form-inputs">
        <div className="popup__form-container">
          <input
            className="popup__form-input popup__form-input_profile-name"
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Введите имя профиля"
            type="text"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__form-input-error name-error"></span>
        </div>
        <div className="popup__form-container">
          <input
            className="popup__form-input popup__form-input_profile-description"
            value={values.about}
            onChange={handleChange}
            name="about"
            placeholder="Введите род деятельности"
            type="text"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__form-input-error description-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
