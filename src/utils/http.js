import axios from '../axios';
import Cookies from 'js-cookie';

export const fetchRegister = async (username, password, fullName) => {
  console.log(username, password, fullName);
  const { data } = await axios.post('/register', {
    username,
    password,
    full_name: fullName,
  });
  return data;
};

export const fetchLogin = async ({ username, password }) => {
  const encodedCredentials = btoa(`${username}:${password}`);
  const { data } = await axios.post(
    '/login',
    { username, password },
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    },
  );
  Cookies.set('auth_token', encodedCredentials, { expires: 7 });
  return data;
};

export const fetchMe = async (token) => {
  const { data } = await axios.get('/me', {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
};

export const getUserInfo = async (username) => {
  const { data } = await axios.get(`/users/${username}`);
  return data;
};

export const getUserPosts = async (username, token, page = 1) => {
  const { data } = await axios.get(`/users/${username}/posts`, {
    params: { page },
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
};

export const fetchPost = async (username, token, post_id) => {
  const { data } = await axios.get(`/users/${username}/posts/${post_id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
};
