import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FetchContacts } from 'services/ApiHandler';

import {
  requestReg,
  requestLogin,
  requestLogout,
  setToken,
  refreshUser,
} from '../services/AuthApi';

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
      FetchContacts();

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await requestLogout();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const auth = await refreshUser();
      return auth;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  },  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true;
    },
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
      .addCase(regThunk.fulfilled, (state, action) => {
        state.authentification = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.user = action.payload.user;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authentification = true;
        state.token = action.payload.token;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.authentification = true;
        // state.token = action.payload.token;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addMatcher(
        isAnyOf(
          logoutThunk.pending,
          loginThunk.pending,
          regThunk.pending,
          refreshThunk.pending
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          logoutThunk.rejected,
          loginThunk.rejected,
          regThunk.rejected,
          refreshThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;
