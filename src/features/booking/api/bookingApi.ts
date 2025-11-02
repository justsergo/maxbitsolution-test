import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from '../../../shared/constants';
import type { BookingRequest, BookingResponse } from '../types';
import type { RootState } from '../../../app/store';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
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
  tagTypes: ['MovieSessionDetail', 'MovieSession', 'CinemaSession'],
  endpoints: (builder) => ({
    bookSeats: builder.mutation<BookingResponse, { sessionId: number; seats: BookingRequest }>({
      query: ({ sessionId, seats }) => ({
        url: API_ENDPOINTS.MOVIE_SESSIONS.BOOK(sessionId),
        method: 'POST',
        body: seats,
      }),
      invalidatesTags: (_, __, { sessionId }) => [
        { type: 'MovieSessionDetail', id: sessionId },
        'MovieSession',
        'CinemaSession'
      ],
    }),
  }),
});

export const {
  useBookSeatsMutation
} = bookingApi;
