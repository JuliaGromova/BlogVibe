import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }) => {
    try {
        const { data } = await axios.post(`/posts/${postId}/comments`, {
            'text': comment,
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostComments = createAsyncThunk('comment/getPostComments/', async (postId) => {
    try {
        const { data } = await axios.get(`/posts/${postId}/comments`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //create comment
        builder
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false;
            })
            //Получение всех комментариев
            .addCase(getPostComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload
            })
            .addCase(getPostComments.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default commentSlice.reducer