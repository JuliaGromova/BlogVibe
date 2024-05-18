import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../utils/axios'


export const CommentItem = ({ cmt }) => {

    const { user } = useSelector(state => state.auth);

    let avatar;
    if (cmt?.user?.avatarUrl) {
        avatar = <img src={`http://localhost:4444${cmt?.user.avatarUrl}`} alt="avatar" className="rounded-full w-10 h-10" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
    } else {
        const initials = cmt?.user?.name?.trim().toUpperCase().split(' ').map(word => word[0]).join('');
        avatar = <div className="flex items-center justify-center rounded-full w-10 h-10 bg-blue-300 text-s">{initials}</div>;
    }

    const removeCommentHandler = async () => {
        try {
            const { data } = await axios.delete(`/comments/${cmt?._id}`)
            toast('Комментарий был удален')
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast('Ошибка! Не получилось удалить комментарий')
        }
    }

    return (
        <div className='flex items-center gap-3 py-2'>
            <Link to={`/user/${cmt.user?._id}`}>
                <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-s">
                    {avatar}
                </div>
            </Link>
            <div className="flex flex-col">
                <div className="font-bold text-gray-300">{cmt?.user?.name}</div>
                <div className="text-gray-300 text-[17px]">{cmt?.text}</div>
            </div>

            {
                (((user?.status === 'Administrator' || user?.status === 'Moderator') && (cmt?.user?.status !== 'Administrator' || user?.status === 'Administrator'))) && (
                    <div className='flex gap-3 mt-4'>
                        <button
                            onClick={removeCommentHandler}
                            className='flex items-center justify-center gap-2 text-white opacity-50'>
                            <AiFillDelete />
                        </button>
                    </div>
                )
            }

        </div>
    );
}
