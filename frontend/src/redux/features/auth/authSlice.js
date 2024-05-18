import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ login, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        login,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      toast('Неправильный логин или пароль');
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/loginUser', async () => {
  try {
    const { data } = await axios.get('/auth/me')
    return data
  } catch (error) {
    console.log(error)
  }
});

export const registerUser = createAsyncThunk(
  'auth/loginUser',
  async ({ login, password, name, email, avatarUrl }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        login,
        password,
        name,
        email,
        avatarUrl
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return toast("Неверные данные")
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.user = action.payload?.userData;
        state.token = action.payload?.token;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = action.payload?.message;
        state.isLoading = false;
      });

    builder
      // registerUser and loginUser
      .addMatcher(
        (action) => [registerUser.pending, registerUser.fulfilled, registerUser.rejected, loginUser.pending, loginUser.fulfilled, loginUser.rejected].includes(action.type),
        (state, action) => {
          state.isLoading = action.meta.requestStatus === 'pending';
          state.status = action.payload?.message || null;
          state.user = action.payload?.userData || null;
          state.token = action.payload?.token || null;
        }
      );
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions
export default authSlice.reducer;
