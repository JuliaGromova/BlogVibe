import React, { useCallback, useState, useEffect } from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage, AiFillHeart, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem';

export const PostPage = () => {

  const id = useParams().id;

  const isAuth = useSelector(checkIsAuth)

  const [post, setPost] = useState();
  const [comment, setComment] = useState('');
  const [likes, setlikes] = useState();
  const [commentsCount, setCommentsCount] = useState();

  const { user } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`)
      setPost(data)
      setlikes(data.likesCount)
      setCommentsCount(data.commentsCount)
    } catch (error) {
      console.log(error)
      if (!window.localStorage.getItem('token') && !isAuth) {
        navigate('/autn/not')
      } else {
        navigate('/error')
      }
    }
  }, [id]);

  const handleSubmit = () => {
    try {
      const postId = id
      dispatch(createComment({ postId, comment }))
      setComment('')
      setCommentsCount(comments.length + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const pushLikes = useCallback(async () => {
    try {
      const { data } = await axios.patch(`/posts/${id}/like`, {
        id,
      })
      setlikes(data.likesCount)
    } catch (error) {
      console.log(error)
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id))
    } catch (error) {
      console.log(error)
    }
  }, [id, dispatch])

  const removePostHandler = async () => {
    try {
      const { data } = await axios.delete(`/posts/${id}`, id)
      toast('Пост был удален')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast('Ошибка! Не получилось удалить пост')
    }
  }

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  if (!post) {
    return <div className='text-xl text-center text-white py-10'>Загрузка...</div>;
  }

  return (
    <div>

      <button className='flex justify-center items-center bg-gray-600 text-s text-white rounded-sm py-2 px-4'>
        <Link to={'/'}>
          Назад
        </Link>
      </button>
      <div className='ml-10 flex gap-10 py-8 '>
        <div className='w-2/3'>
          <div className="flex flex-col basis-1/4 flex-grow">
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

            <p className='text-white text-s pt-4'>{post?.text}</p>
            <div className='flex gap-3 items-center mt-2 justify-between'>
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-s text-white opacity-50'>
                  <AiFillEye />
                  <span>{post?.viewsCount || 0}</span>
                </button>
                <button onClick={pushLikes} className='flex items-center justify-center gap-2 text-s text-white opacity-50'>
                  <AiFillHeart />
                  <span>{likes || 0}</span>
                </button>
                <button className='flex items-center justify-center gap-2 text-s text-white opacity-50'>
                  <AiOutlineMessage />
                  <span>{commentsCount || 0}</span>
                </button>
              </div>

              {
                (user?._id === post.user._id || ((user?.status === 'Administrator' || user?.status === 'Moderator') && post.user.status !== 'Administrator')) && (
                  <div className='flex gap-3 mt-4'>
                    <button
                      onClick={removePostHandler}
                      className='flex items-center justify-center gap-2 text-white opacity-50'>
                      <AiFillDelete />
                    </button>
                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                      <Link to={`/${id}/edit`}>
                        <AiTwotoneEdit />
                      </Link>
                    </button>
                  </div>
                )
              }

            </div>
          </div>
        </div>
        <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Комментарий...'
              className='text-black w-full rounded-sm bg-gray-400 border p-2 text-s outline-none placeholder:text-gray-700' />
            <button type='submit'
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-s text-white rounded-sm py-2 px-4'>
              Oтправить</button>
          </form>
          {
            comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt} />
            ))
          }
        </div>
      </div>
    </div>
  )
}


