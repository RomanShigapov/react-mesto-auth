import useForm from "../hooks/useForm";
import RegLogForm from "./RegLogForm";

function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <div className="reg-log-form page-section">
      <RegLogForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit}
      >
        <fieldset className="reg-log-form__form-inputs">
          <input
            className="reg-log-form__form-input"
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            type="email"
            required
            minLength="2"
            maxLength="40"
          />
          <input
            className="reg-log-form__form-input"
            value={values.password}
            onChange={handleChange}
            name="password"
            placeholder="Пароль"
            type="password"
            required
            minLength="2"
            maxLength="40"
          />
        </fieldset>
      </RegLogForm>
    </div>
  );
}

export default Login;
