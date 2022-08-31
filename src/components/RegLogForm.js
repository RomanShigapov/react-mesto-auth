function RegLogForm({ name, title, buttonText, onSubmit, children }) {
  return (
    <>
      <h2 className="reg-log-form__title">{title}</h2>
      <form
        className="reg-log-form__form"
        name={`${name}-form`}
        onSubmit={onSubmit}
      >
        {children}
        <button
          className="reg-log-form__submit-button button button_opacity_high"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}
export default RegLogForm;
