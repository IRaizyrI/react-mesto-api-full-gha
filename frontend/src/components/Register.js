import React from 'react'
import { Link } from 'react-router-dom'
export default function Register({ handleRegister }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleRegister({password, email}, 'register')
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__form_input" placeholder="Email" type="email" autoComplete="username" onChange={handleChangeEmail}></input>
        <input className="auth__form_input" placeholder="Пароль" type="password" autoComplete="current-password" onChange={handleChangePassword}></input>
        <button className="auth__form_submit-button"type= "submit">Зарегистрироваться</button>
      </form>
      <Link className="auth__link" to={'/sign-in'}>Уже зарегистрированы? Войти</Link>
    </div>
  )
}
