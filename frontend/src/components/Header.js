import logo from "../images/mesto.svg";
import { Switch, Route, Link } from "react-router-dom";
function Header({ signOut, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <Switch>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <h2 className="header__email">{email}</h2>
            <a className="header__link header__link_sign-out" onClick={signOut}>
              Выйти
            </a>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
