import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom'
import { AiTwotoneSmile, AiTwotoneFrown } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const UserPage = (req, res) => {

    const { user } = useSelector(state => state.auth);

    const id = useParams().id;
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    const fetchUserData = useCallback(async () => {
        try {
            const { data } = await axios.get(`/auth/user/${id}`)
            setCurrentUser(data)
        } catch (error) {
            console.error(error)
            if (!window.localStorage.getItem('token') && !isAuth) {
                navigate('/autn/not')
            } else {
                navigate('/error')
            }
        }
    }, []);

    const banUserHandler = async () => {
        try {
            const { data } = await axios.patch(`/auth/user/${id}/ban`, id)
            if (data) {
                toast('Пользователь забанен')
            } else {
                toast('Пользователь восстановлен')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const moderUserHandler = async () => {
        try {
            const { data } = await axios.patch(`/auth/user/${id}/moder`, id)
            if (data) {
                toast('Пользователь стал модератором')
            } else {
                toast('Модератор стал пользователем')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <div className='ml-10 flex gap-10 py-8 justify-center'>
            <div className='border p-4'>
                {
                    user?.status === 'Administrator' && currentUser?.status === 'User' && (
                        <div className='flex items-center justify-center gap-2 text-white opacity-50'>
                            <button
                                onClick={banUserHandler}
                                className='flex justify-center items-center bg-red-500 text-m text-white rounded-sm py-2 px-4'>
                                Бан
                                <AiTwotoneFrown />
                            </button>
                        </div>
                    )
                }

                {
                    user?.status === 'Administrator' && currentUser?.status === 'Banned' && (
                        <div className='flex items-center justify-center gap-2 text-white opacity-50'>
                            <button
                                onClick={banUserHandler}
                                className='flex justify-center items-center bg-green-500 text-m text-white rounded-sm py-2 px-4'>
                                Восстановить
                                <AiTwotoneSmile />
                            </button>
                        </div>
                    )
                }
                <h1 className='text-lg text-white text-center'>Информация о пользователе</h1>
                <div className='mt-4'>
                    <div className='border p-2 text-white'>
                        <p>Имя пользователя:</p>
                        <p>{currentUser?.name}</p>
                    </div>
                    <div className='border p-2 mt-4 text-white'>
                        <p>Электронная почта:</p>
                        <p>{currentUser?.email}</p>
                    </div>
                    <div className='border p-2 mt-4 text-white'>
                        <p>Аватарка:</p>
                        {currentUser?.avatarUrl && <img src={`http://localhost:4444${currentUser?.avatarUrl}`} alt={currentUser?.name} className='w-40 h-40 rounded-full' />}
                    </div>

                    {
                        user?.status === 'Administrator' && currentUser?.status === 'User' && (
                            <div className='flex items-center justify-center gap-2 text-white opacity-50'>
                                <button
                                    onClick={moderUserHandler}
                                    className='flex justify-center items-center bg-green-500 text-m text-white rounded-sm py-2 px-4'>
                                    Сделать модератором
                                </button>
                            </div>
                        )
                    }

                    {
                        user?.status === 'Administrator' && currentUser?.status === 'Moderator' && (
                            <div className='flex items-center justify-center gap-2 text-white opacity-50'>
                                <button
                                    onClick={moderUserHandler}
                                    className='flex justify-center items-center bg-red-500 text-m text-white rounded-sm py-2 px-4'>
                                    Сделать пользователем
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );

};

