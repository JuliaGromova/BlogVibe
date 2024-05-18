import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const NavBar = () => {

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyles = {
    color: 'white',
  };

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
    navigate('/login')
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-24 h-12 bg-gray-600 text-s text-white rounded-sm'>
        Blog Vibe
      </span>

      {
        isAuth && (<ul className="flex gap-8">
          <li><NavLink to={'/'} href="/" className='text-s text-gray-400 hover:text-white'
            style={({ isActive }) => isActive ? activeStyles : undefined}>
            Главная</NavLink>
          </li>
          <li><NavLink to={'/posts'} href="/" className='text-s text-gray-400 hover:text-white'
            style={({ isActive }) => isActive ? activeStyles : undefined}>
            Мои посты</NavLink>
          </li>
          <li><NavLink to={'/new'} href="/" className='text-s text-gray-400 hover:text-white'
            style={({ isActive }) => isActive ? activeStyles : undefined}>
            Добавить пост</NavLink>
          </li>
          <li><NavLink to={'/me'} href="/" className='text-s text-gray-400 hover:text-white'
            style={({ isActive }) => isActive ? activeStyles : undefined}>
            Мой профиль</NavLink>
          </li>
        </ul>)
      }

      <div className='flex justify-center items-center bg-gray-600 text-white rounded-sm px-4 py-2'>
        {
          isAuth ? (<button onClick={logoutHandler}>
            Выйти
          </button>) : (<Link to={'/login'}> Войти </Link>)
        }
      </div>

    </div>
  )
}