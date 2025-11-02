import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from '../../../shared/constants';
import type { Movie, MovieSession, MovieSessionDetail } from '../types';
import type { RootState } from '../../../app/store';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => API_ENDPOINTS.MOVIES.LIST,
    }),
    getMovieSessions: builder.query<MovieSession[], number>({
      query: (movieId) => API_ENDPOINTS.MOVIES.SESSIONS(movieId),
    }),
    getMovieSessionDetail: builder.query<MovieSessionDetail, number>({
      query: (sessionId) => API_ENDPOINTS.MOVIE_SESSIONS.DETAIL(sessionId),
    }),
  }),
});

export const { 
  useGetMoviesQuery, 
  useGetMovieSessionsQuery, 
  useGetMovieSessionDetailQuery 
} = moviesApi;
