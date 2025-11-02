export const API_BASE_URL = 'http://localhost:3022';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  MOVIES: {
    LIST: '/movies',
    SESSIONS: (movieId: number) => `/movies/${movieId}/sessions`,
  },
  CINEMAS: {
    LIST: '/cinemas',
    SESSIONS: (cinemaId: number) => `/cinemas/${cinemaId}/sessions`,
  },
  MOVIE_SESSIONS: {
    DETAIL: (sessionId: number) => `/movieSessions/${sessionId}`,
    BOOK: (sessionId: number) => `/movieSessions/${sessionId}/bookings`,
  },
  BOOKINGS: {
    LIST: '/bookings',
    PAYMENT: (bookingId: string) => `/bookings/${bookingId}/payments`,
  },
  ME: {
    BOOKINGS: '/me/bookings',
  },
  SETTINGS: '/settings',
} as const;
