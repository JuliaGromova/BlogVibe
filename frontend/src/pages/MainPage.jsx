import React, { useEffect } from 'react';
import { PostItem } from '../components/PostItem';
import { PopularPosts } from '../components/PopularPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getPopularPosts } from '../redux/features/post/postSlice';

export const MainPage = () => {

    const dispatch = useDispatch();
    const { posts, popularPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getPopularPosts())
    }, [])

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col gap-10 basis-4/5'>
                    {posts.items.map((post, idx) => (
                        <PostItem key={idx} post={post} />
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>
                    {popularPosts?.items.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}