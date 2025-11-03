import type { MovieSession, Cinema } from '@/features/movies/types';

export interface SessionsListProps {
  sessions: MovieSession[];
  cinemas: Cinema[];
}

