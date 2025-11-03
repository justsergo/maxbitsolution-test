import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/constants';
import type { Booking, Settings, PaymentResponse } from '../types';
import type { RootState } from '@/app/store';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
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
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getMyBookings: builder.query<Booking[], void>({
      query: () => API_ENDPOINTS.ME.BOOKINGS,
      providesTags: ['Booking'],
    }),
    payBooking: builder.mutation<PaymentResponse, string>({
      query: (bookingId) => ({
        url: API_ENDPOINTS.BOOKINGS.PAYMENT(bookingId),
        method: 'POST',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getSettings: builder.query<Settings, void>({
      query: () => API_ENDPOINTS.SETTINGS,
      providesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetMyBookingsQuery,
  usePayBookingMutation
} = ticketsApi;

export const {
  useGetSettingsQuery
} = settingsApi;
