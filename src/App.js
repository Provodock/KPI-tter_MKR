import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import FullPost from './pages/FullPost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post/:username" element={<CreatePost />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/post/:username/:post_id" element={<FullPost />} />
    </Routes>
  );
}

export default App;
