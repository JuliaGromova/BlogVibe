import { Layout } from './components/Layout.jsx';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage.jsx';
import { PostsPage } from './pages/PostsPage.jsx';
import { PostPage } from './pages/PostPage.jsx';
import { AddPostPage } from './pages/AddPostPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { EditPostPage } from './pages/EditPostPage.jsx';
import { NotAuthPage } from './pages/NotAuthPage.jsx';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkIsAuth, getMe } from './redux/features/auth/authSlice.js';
import { NotFound } from './pages/NotFound.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { UserPage } from './pages/UserPage.jsx';


function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/:id' element={<PostPage />} />
        <Route path='/:id/edit' element={<EditPostPage />} />
        <Route path='/new' element={<AddPostPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/error' element={<NotFound />} />
        <Route path='/autn/not' element={<NotAuthPage />} />
        <Route path='/me' element={<ProfilePage />} />
        <Route path='/user/:id' element={<UserPage />} />
        <Route path='*' element={<Navigate to='/error' />} />
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
