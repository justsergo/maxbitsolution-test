export const API_BASE_URL = 'http://localhost:3022';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  MOVIES: '/movies',
  CINEMAS: '/cinemas',
  MOVIE_SESSIONS: '/movieSessions',
  BOOKINGS: '/bookings',
  ME: {
    BOOKINGS: '/me/bookings',
  },
  SETTINGS: '/settings',
} as const;
