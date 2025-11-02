import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api/authApi';
import { moviesApi } from '../features/movies/api/moviesApi';
import { cinemasApi } from '../features/cinemas/api/cinemasApi';
import { authSlice } from '../features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [cinemasApi.reducerPath]: cinemasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, moviesApi.middleware, cinemasApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
