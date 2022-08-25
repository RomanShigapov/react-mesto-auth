import PopupWithForm from './PopupWithForm';

function DeleteCardConfirmationPopup({ isOpen, onClose, onConfirmDelete, isLoading, card }) {

  function handleSubmit(evt) {
    evt.preventDefault();

    onConfirmDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      name="delete-card-confirmation-form"
      title="Удалить, вы уверены?"
      buttonText="Да"
      buttonLoadingText="Удаление..."
    >
    </PopupWithForm>
  );

}

export default DeleteCardConfirmationPopup;
