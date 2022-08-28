import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import RegLogForm from './RegLogForm';


function Register({ onRegister, onShowInfo }) {

  const {values, handleChange, setValues} = useForm({
    email: '',
    password: ''
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    // onRegister(values);
    // onShowInfo({ text: "Вы успешно зарегистрировались!", isSuccessful: true});
    onShowInfo({ text: "Что-то пошло не так! Попробуйте еще раз.", isSuccessful: false});
  }

  return (
    <div className="reg-log-form page-section">
      <RegLogForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <fieldset className="reg-log-form__form-inputs">
          <input className="reg-log-form__form-input" value={values.email} onChange={handleChange} name="email" placeholder="Email" type="email"
          // required minLength="2" maxLength="40"
          />
          <input className="reg-log-form__form-input" value={values.password} onChange={handleChange} name="password" placeholder="Пароль" type="password"
          // required minLength="2" maxLength="40"
          />
        </fieldset>
      </ RegLogForm>
      <Link to="/sign-in" className="reg-log-form__link">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;
