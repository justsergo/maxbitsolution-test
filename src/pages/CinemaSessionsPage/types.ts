import type { MovieSession, Movie } from '@/features/movies/types';

export interface CinemaSessionsListProps {
  sessions: MovieSession[];
  movies: Movie[];
}
