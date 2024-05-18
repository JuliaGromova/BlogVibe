import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios'

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    popularPosts: {
        items: [],
        status: 'loading'
    },
    loading: false,
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const { data } = await axios.post('/posts', params)
        return data
    }
    catch (error) {
        console.log(error)
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const { data } = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost) => {
    try {
        const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/posts')
        return data
    }
    catch (error) {
        console.log(error)
    }
})

export const getPopularPosts = createAsyncThunk('posts/getPopularPosts', async () => {
    try {
        const { data } = await axios.get('/popularPosts')
        return data
    }
    catch (error) {
        console.log(error)
    }
})

export const pushLike = createAsyncThunk('posts/pushLike', async (postId) => {
    try {
        const { data } = await axios.patch(`/posts/${postId}/like`, {
            postId,
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //create Post
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = false;
                state.posts.status = 'create';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.status = 'created';
                state.posts.items = action.payload;
            })
            .addCase(createPost.rejected, (state) => {
                state.loading = false;
                state.posts.status = 'error';
            })
            //Получение всех постов
            .addCase(getAllPosts.pending, (state) => {
                state.posts.items = [];
                state.posts.status = 'loading';
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.status = 'loaded';
                state.posts.items = action.payload;
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.posts.items = [];
                state.posts.status = 'error';
                state.loading = false;
            })
            //Получение популярных постов
            .addCase(getPopularPosts.pending, (state) => {
                state.popularPosts.items = [];
                state.popularPosts.status = 'loading';
                state.loading = true;
            })
            .addCase(getPopularPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.popularPosts.status = 'loaded';
                state.popularPosts.items = action.payload;
            })
            .addCase(getPopularPosts.rejected, (state) => {
                state.popularPosts.items = [];
                state.popularPosts.status = 'error';
                state.loading = false;
            })
            //Удаление поста
            .addCase(removePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.items = state.posts.items.filter(
                    (post) => post._id !== action.payload._id)
            })
            .addCase(removePost.rejected, (state) => {
                state.loading = false;
            })
            //Обновление поста
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.items.findIndex((post) => post._id === action.payload._id)
                state.posts.items[index] = action.payload
            })
            .addCase(updatePost.rejected, (state) => {
                state.loading = false;
            })
            //Ставим лайк
            .addCase(pushLike.pending, (state) => {
                state.loading = true;
            })
            .addCase(pushLike.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(pushLike.rejected, (state) => {
                state.loading = false;
            })
    },
},
);

export default postSlice.reducer