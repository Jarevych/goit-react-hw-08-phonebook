import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestReg, requestLogin, requestLogout } from '../services/AuthApi';

export const regThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const authData = await requestReg(formData);
      console.log(authData);
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const authData = await requestLogin(formData);
      console.log(authData);
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/register',
  async (_, thunkAPI) => {
    try {
      const authData = await requestLogout();
      console.log(authData);
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
  },
  authentification: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(regThunk.pending, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(regThunk.fulfilled, (state, action) => {
        state.authentification = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(regThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginThunk.pending, state => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authentification = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
