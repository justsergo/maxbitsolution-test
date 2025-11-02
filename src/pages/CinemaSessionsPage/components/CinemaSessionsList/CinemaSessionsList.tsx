import { SessionTimeButton } from '../../../MovieDetailPage/components/SessionTimeButton';
import { Icon } from '../../../../shared/ui/Icon';
import { API_BASE_URL } from '../../../../shared/constants';
import type { CinemaSessionsListProps } from '../../types';
import './CinemaSessionsList.scss';

export const CinemaSessionsList = ({ sessions, movies }: CinemaSessionsListProps) => {
  const groupedSessions = sessions.reduce((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
    if (!acc[date]) {
      acc[date] = {};
    }
    
    const movieId = session.movieId;
    if (!acc[date][movieId]) {
      acc[date][movieId] = [];
    }
    
    acc[date][movieId].push(session);
    return acc;
  }, {} as Record<string, Record<number, typeof sessions>>);

  if (sessions.length === 0) {
    return (
      <div className="cinema-sessions-list">
        <div className="cinema-sessions-list__empty">Нет доступных сеансов</div>
      </div>
    );
  }

  return (
    <div className="cinema-sessions-list">
      {Object.entries(groupedSessions).map(([date, movieSessions]) => (
        <div key={date} className="cinema-sessions-list__date-group">
          <h3 className="cinema-sessions-list__date">{date}</h3>
          
          {Object.entries(movieSessions).map(([movieIdStr, movieSessionsList]) => {
            const movieId = Number(movieIdStr);
            const movie = movies.find(m => m.id === movieId);
            
            return (
              <div key={movieId} className="cinema-sessions-list__movie">
                <div className="cinema-sessions-list__movie-poster">
                  {movie?.posterImage ? (
                    <img 
                      src={`${API_BASE_URL}${movie.posterImage}`} 
                      alt={movie.title}
                      className="cinema-sessions-list__movie-image"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="cinema-sessions-list__movie-placeholder">
                      <Icon name="image-placeholder" size={24} />
                    </div>
                  )}
                </div>
                
                <div className="cinema-sessions-list__movie-name">
                  {movie?.title || 'Неизвестный фильм'}
                </div>
                
                <div className="cinema-sessions-list__times">
                  {movieSessionsList.map((session) => (
                    <SessionTimeButton
                      key={session.id}
                      sessionId={session.id}
                      time={new Date(session.startTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
