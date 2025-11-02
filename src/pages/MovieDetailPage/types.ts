import type { MovieSession } from '../../features/movies/types';

export interface SessionsListProps {
  sessions: MovieSession[];
}

export interface SessionTimeButtonProps {
  sessionId: number;
  time: string;
}
