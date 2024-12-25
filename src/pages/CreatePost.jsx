import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = Cookies.get('auth_token');
  const { username } = useParams();
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `/users/${username}/posts`,
        { content },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      navigate(`/profile/${username}`);
    } catch (err) {
      setError('Помилка при створенні посту.');
    }
  };

  return (
    <>
      <Header />
      <div className="create-post">
        <h1>Створити пост</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="create-post-form">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Введіть текст поста..."
            rows="6"
            className="post-content"
          />
          <button type="submit" className="submit-button" disabled={!content}>
            Опублікувати
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
