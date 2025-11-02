import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, SetCredentialsPayload } from '../types';

const initialState: AuthState = {
  isAuthenticated: !!sessionStorage.getItem('token'),
  token: sessionStorage.getItem('token'),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: { payload: SetCredentialsPayload }) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      sessionStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
