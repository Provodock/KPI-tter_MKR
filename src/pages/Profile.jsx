import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo, getUserPosts } from '../utils/http';
import Cookies from 'js-cookie';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('auth_token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${username} - Профіль`;

    const fetchData = async () => {
      try {
        const userInfoData = await getUserInfo(username);
        const userPostsData = await getUserPosts(username, token);
        setUserInfo(userInfoData);
        setUserPosts(userPostsData);
      } catch (error) {
        setError('Неможливо завантажeння даних');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, token]);

  console.log(userPosts[0]);

  if (isLoading) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-header">
          <h1 className="profile-username">{userInfo?.full_name || username}</h1>
        </div>
        {error ? (
          <div className="error">
            <span className="error-message">Такого користувача не існує</span>
          </div>
        ) : (
          <div className="profile-posts">
            <h2>Пости користувача</h2>
            {userPosts.length > 0 ? (
              <ul className="posts-list">
                {userPosts.map((post) => (
                  <li
                    onClick={() => navigate(`/post/${post.author.username}/${post.id}`)}
                    key={post.id}
                    className="post-item">
                    <div className="post-header">
                      <div className="post-avatar">
                        {/* Можна додати ініціали або аватарку користувача */}
                        {post.author.full_name.split(' ')[0][0]}
                        {post.author.full_name.split(' ')[1][0]}
                      </div>
                      <div>
                        <h3 className="post-author">{post.author.full_name}</h3>
                        <span className="post-author-username">@{post.author.username}</span>
                      </div>
                    </div>

                    <p className="post-content">{post.content}</p>

                    <div className="post-info">
                      <span className="post-likes">{post.likes} Likes</span>
                      <span className="post-created-at">
                        {new Date(post.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="post-footer">
                      <span className="post-liked">
                        {post.is_liked ? 'You liked this' : "You haven't liked this"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-posts">У користувача немає постів.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
