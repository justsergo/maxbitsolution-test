import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from '../../../shared/constants';
import type { Cinema, MovieSession } from '../../movies/types';
import type { RootState } from '../../../app/store';

export const cinemasApi = createApi({
  reducerPath: 'cinemasApi',
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
  tagTypes: ['Cinema', 'CinemaSession'],
  endpoints: (builder) => ({
    getCinemas: builder.query<Cinema[], void>({
      query: () => API_ENDPOINTS.CINEMAS.LIST,
      providesTags: ['Cinema'],
    }),
    getCinemaSessions: builder.query<MovieSession[], number>({
      query: (cinemaId) => API_ENDPOINTS.CINEMAS.SESSIONS(cinemaId),
      providesTags: (_, __, cinemaId) => [
        { type: 'CinemaSession', id: cinemaId }
      ],
    }),
  }),
});

export const {
  useGetCinemasQuery,
  useGetCinemaSessionsQuery
} = cinemasApi;
