import useForm from '../hooks/useForm';

function Login({ name, title, buttonText, onSubmit}) {

  const {values, handleChange, setValues} = useForm({
    email: '',
    password: ''
  });

  return (
    <div className="reg-log-form page-section">
      <h2 className="reg-log-form__title">{title}</h2>
      <form className="reg-log-form__form" name={`${name}-form`} onSubmit={onSubmit}>
        <fieldset className="reg-log-form__form-inputs">
          <input className="reg-log-form__form-input" value={values.email} onChange={handleChange} name="email" placeholder="Email" type="email" required minLength="2" maxLength="40" />
          <input className="reg-log-form__form-input" value={values.password} onChange={handleChange} name="password" placeholder="Пароль" type="password" required minLength="2" maxLength="40" />
        </fieldset>
        <button className="reg-log-form__submit-button button button_opacity_high" type="submit">{buttonText}</button>
      </form>
    </div>
  );
}

export default Login;
