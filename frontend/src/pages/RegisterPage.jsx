import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import axios from '../utils/axios';

export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [avatarUrl, setAvatarImage] = useState('')
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if (status) { toast(status) };
        if (isAuth) { navigate('/') };
        console.log(status, isAuth);
    }, [status, isAuth, navigate])

    const handleImageChange = async (event) => {
        try {
            const dataImage = new FormData();
            const file = event.target.files[0];
            console.log(file)
            dataImage.append('image', file);
            const { data } = await axios.post('/upload', dataImage);
            console.log(data);
            setAvatarImage(data.url)
        } catch (error) {
            console.log(error)
            toast('Ошибка при загрузке файла!')
        }
    }

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ name, login, password, email, avatarUrl }));
            setName('');
            setPassword('');
            setEmail('');
            setLogin('');
            setAvatarImage('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-20">
            <h1 className='text-lg text-white text-center'>Регистрация</h1>
            <label className='text-gray-300 py-3 px-10 bg-gray-600 text-s mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Выберите фото на аватарку:
                <input type='file' className='hidden' onChange={handleImageChange} />
            </label>
            {avatarUrl && <img src={`http://localhost:4444${avatarUrl}`} alt="avatar-preview" className="w-20 h-20 mt-2" />}
            <label className='text-s text-white'>
                Придумайте имя:
                <input type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя пользователя (минимум 3 символа)'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
            </label>
            <label className='text-s text-white'>
                Придумайте логин для входа:
                <input type='text'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Логин (минимум 4 символа)'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
            </label>
            <label className='text-s text-white'>
                Придумайте пароль:
                <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль (минимум 4 символа)'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
            </label>
            <label className='text-s text-white'>
                Введите еmail:
                <input type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700' />
            </label>
            <div className="flex gap-8 justify-center mt-4">
                <button type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-s bg-gray-600 text-white rounded-sm py-2 px-4 mt-2'>
                    Подтвердить действие
                </button>
                <Link to='/login' className='flex justify-center items-center text-s bg-gray-600 text-white rounded-sm py-2 px-4'>
                    Уже зарегистрирован?
                </Link>
            </div>
        </form>
    );
};
