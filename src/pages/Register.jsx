import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../utils/http';
function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetchRegister(username, password, fullName);
      setSuccess(true);
      console.log(response);
      navigate('/login');
    } catch (err) {
      setError('Не вдалося зареєструватися. Перевірте введені дані.');
    }
  };

  return (
    <div className="register">
      <h1 className="register-title">Реєстрація</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Повне ім'я</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            required
            placeholder="Ваше повне ім'я"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Ім'я користувача</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            placeholder="Ваше ім'я користувача"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Ваш пароль"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Реєстрація успішна!</p>}
        <button type="submit" className="register-button">
          Зареєструватися
        </button>
      </form>
    </div>
  );
}

export default Register;
