import React, { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { checkIsAuth } from '../redux/features/auth/authSlice'
import axios from '../utils/axios'

export const EditPostPage = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const navigate = useNavigate()
  const params = useParams()
  const isAuth = useSelector(checkIsAuth)

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)
      setTitle(data.title)
      setText(data.text)
      setOldImage(data.imageUrl)
    } catch (error) {
      console.log(error)
      if (!window.localStorage.getItem('token') && !isAuth) {
        navigate('/autn/not')
      } else {
        navigate('/error')
      }
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl: newImage ? (newImage) : (oldImage),
      }
      const { data } = await axios.patch(`/posts/${params.id}`, fields)
      const id = data._id;
      navigate(`/${id}`)
    }
    catch (error) {
      console.log(error)
      alert('Ошибка при обновлении статьи!')
    }

  }
  const clearFormHandler = () => {
    navigate('/posts')
  }

  const handelChangeFile = async (event) => {
    try {
      const dataImage = new FormData();
      const file = event.target.files[0];
      dataImage.append('image', file);
      const { data } = await axios.post('/upload', dataImage);
      setNewImage(data.url)
    } catch (error) {
      console.log(error)
      alert('Ошибка при загрузке файла!')
    }
  }

  return (
    <form
      className='w-1/3 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-3 px-10 bg-gray-600 text-s mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение:
        <input type='file' className='hidden' onChange={handelChangeFile} />
      </label>
      <div className='flex py-2 items-center'>
        {newImage ? (<img src={`http://localhost:4444${newImage}`} alt={newImage.name} />) : oldImage && (<img src={`http://localhost:4444${oldImage}`} alt='oldImage' />)}
      </div>

      <label className='text-s text-white opacity-70'>
        Заголовок поста:
        <input type='text'
          placeholder='Заголовок'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder-gray-700'></input>
      </label>
      <label className='text-s text-white opacity-70'>
        Текст поста:
        <textarea type='text'
          value={text}
          placeholder='Текст поста'
          onChange={(e) => setText(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none resize-none h-40 placeholder-gray-700'></textarea>
      </label>
      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-gray-400 text-s text-white rounded-sm py-2 px-4'>
          Обновить пост
        </button>
        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-500 text-s text-white rounded-sm py-2 px-4'>
          Отменить
        </button>
      </div>
    </form>
  )
}
