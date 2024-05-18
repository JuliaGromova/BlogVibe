import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    const fetchUserData = useCallback(async () => {
        try {
            const { data } = await axios.get('/auth/profile')
            setUser(data)
        } catch (error) {
            console.error(error)
            if (!window.localStorage.getItem('token') && !isAuth) {
                navigate('/autn/not')
            }
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <div className='ml-10 flex gap-10 py-8 justify-center'>
            <div className='border p-4'>
                <h1 className='text-lg text-white text-center'>Информация о пользователе</h1>
                <div className='mt-4'>
                    <div className='border p-2 text-white'>
                        <p>Имя пользователя:</p>
                        <p>{user?.name}</p>
                    </div>
                    <div className='border p-2 mt-4 text-white'>
                        <p>Статус:</p>
                        <p>{user?.status}</p>
                    </div>
                    <div className='border p-2 mt-4 text-white'>
                        <p>Электронная почта:</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className='border p-2 mt-4 text-white'>
                        <p>Аватарка:</p>
                        {user?.avatarUrl && <img src={`http://localhost:4444${user?.avatarUrl}`} alt={user?.name} className='w-40 h-40 rounded-full' />}
                    </div>
                </div>
            </div>
        </div>
    );

};

