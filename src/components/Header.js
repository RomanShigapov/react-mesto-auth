import { Switch, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header page-section">
        <Link to="/" className="header__logo"></Link>
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
          <Route exact path="/">
            <p className='header__email'>email@yandex.ru</p>
            <Link to="/sign-in" className="header__link">Выйти</Link>
          </Route>
        </Switch>
    </header>
  );
}

export default Header;
