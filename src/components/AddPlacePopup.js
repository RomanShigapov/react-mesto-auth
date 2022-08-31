import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(values);
  }

  useEffect(() => {
    setValues({
      name: "",
      link: "",
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      buttonLoadingText="Создание..."
    >
      <fieldset className="popup__form-inputs">
        <div className="popup__form-container">
          <input
            className="popup__form-input popup__form-input_new-card-name"
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Название"
            type="text"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__form-input-error name-error"></span>
        </div>
        <div className="popup__form-container">
          <input
            className="popup__form-input popup__form-input_new-card-image-link"
            value={values.link}
            onChange={handleChange}
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

export default AddPlacePopup;
