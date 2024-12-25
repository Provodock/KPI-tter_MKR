import React from 'react';
import { AiOutlineUser, AiOutlineEdit } from 'react-icons/ai';
import { MdExitToApp, MdLogin } from 'react-icons/md';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMe } from '../utils/http';

function Header() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await fetchMe(token);
        setUser(response);
      } catch (err) {
        setError('Невдалося завантажити дані');
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const token = Cookies.get('auth_token');

  const logout = () => {
    Cookies.remove('auth_token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <h1 className="header-title">
            <AiOutlineEdit className="header-icon" /> KPI-tter
          </h1>
        </Link>
        <div className="header-user">
          {token ? (
            <div className="logged-in">
              <Link to={`/profile/${user?.username}`} className="user-link">
                <AiOutlineUser className="user-icon" />
                <span className="username">{user?.username}</span>
              </Link>
              <Link to={`/create-post/${user?.username}`} className="create-post-button">
                <AiOutlineEdit className="create-icon" />
                Створити пост
              </Link>
              <button onClick={logout} className="logout-button">
                <MdExitToApp className="logout-icon" />
                Вийти
              </button>
            </div>
          ) : (
            <div className="logged-out">
              <button onClick={() => navigate('/login')} className="login-button">
                <MdLogin className="login-icon" />
                Увійти
              </button>
              <button onClick={() => navigate('/register')} className="login-button">
                <MdLogin className="login-icon" />
                Зареєструватися
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
