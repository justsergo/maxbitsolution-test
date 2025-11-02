export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  MOVIE_DETAIL: (movieId: number) => `/movies/${movieId}`,
  CINEMAS: '/cinemas',
  CINEMA_SESSIONS: (cinemaId: number) => `/cinemas/${cinemaId}/sessions`,
  MY_TICKETS: '/my-tickets',
  LOGIN: '/login',
  REGISTER: '/register',
  SESSION_BOOKING: (sessionId: number) => `/sessions/${sessionId}/booking`,
} as const;
