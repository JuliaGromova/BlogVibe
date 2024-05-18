import React, { useEffect, useState, useCallback } from 'react'
import axios from '../utils/axios'
import { PostItem } from '../components/PostItem';
import { useSelector } from 'react-redux'
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'


export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
      if (!window.localStorage.getItem('token') && !isAuth) {
        navigate('/autn/not')
      }
    }
  }, [])

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts])


  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {posts?.map((post, idx) => <PostItem post={post} key={idx} />)}
    </div>
  )
}
