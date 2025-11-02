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
  CINEMAS: '/cinemas',
  MOVIE_SESSIONS: {
    DETAIL: (sessionId: number) => `/movieSessions/${sessionId}`,
    BOOK: (sessionId: number) => `/movieSessions/${sessionId}`,
  },
  BOOKINGS: '/bookings',
  ME: {
    BOOKINGS: '/me/bookings',
  },
  SETTINGS: '/settings',
} as const;
