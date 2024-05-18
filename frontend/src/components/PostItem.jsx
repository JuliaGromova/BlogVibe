import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>Постов не существует</div>
    )
  }
  return (
    <Link to={`/${post._id}`}>
      <div className='flex flex-col basis-1/4 flex-grow'>
        <div className={
          post.imageUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
        }>
          {post.imageUrl && (
            <img src={`http://localhost:4444${post?.imageUrl}`} alt="img" className='object-cover w-full' />
          )}
        </div>
        <div className='text-white text-xl'>{post?.title}</div>
        <div className='flex justify-between items-center pt-2'>
          <div className='text-s text-white opacity-50'>{post?.user.name}</div>
          <div className='text-s text-white opacity-50'><Moment date={post.createdAt} format='D MM YYYY' /></div>
        </div>

        <p className='text-white opacity-60 text-xs pt-4 line-clamp-3'>{post?.text}</p>
        <div className='flex gap-3 items-center mt-2'>
          <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
            <AiFillEye />
            <span>{post?.viewsCount || 0}</span>
          </button>
          <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
            <AiFillHeart />
            <span>{post.likesCount || 0}</span>
          </button>
          <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
            <AiOutlineMessage />
            <span>{post.commentsCount || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
