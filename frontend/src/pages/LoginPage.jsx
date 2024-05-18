import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    if (status) { toast(status) };
    if (isAuth) { navigate('/') };
    console.log(status, isAuth);
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ login, password }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40">
      <h1 className='text-lg text-white text-center'>Авторизация</h1>
      <label className='text-s text-white'>
        Введите логин:
        <input type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder='Логин'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-s text-white'>
        Введите пароль:
        <input type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-s bg-gray-600 text-white rounded-sm py-2 px-4'>Войти</button>
        <Link to='/register'
          className='flex justife-center items-center text-s bg-gray-600 text-white rounded-sm py-2 px-4'>
          Нет аккаунта?
        </Link>
      </div>
    </form>)
}
