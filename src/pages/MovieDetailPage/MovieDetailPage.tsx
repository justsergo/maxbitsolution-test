import { useParams } from 'react-router-dom';
import { useGetMoviesQuery, useGetMovieSessionsQuery } from '../../features/movies/api/moviesApi';
import { API_BASE_URL } from '../../shared/constants';
import { SessionsList } from './components/SessionsList';
import './MovieDetailPage.scss';

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const movieIdNum = Number(movieId);

  const { data: movies, isLoading: moviesLoading } = useGetMoviesQuery();
  const { data: sessions, isLoading: sessionsLoading, error: sessionsError } = useGetMovieSessionsQuery(movieIdNum);

  const movie = movies?.find(m => m.id === movieIdNum);

  if (moviesLoading || sessionsLoading) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-page__error">Фильм не найден</div>
      </div>
    );
  }

  if (sessionsError) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <h1 className="movie-detail-page__title">{movie.title}</h1>
      
      <div className="movie-detail-page__content">
        <div className="movie-detail-page__poster">
          <img 
            src={`${API_BASE_URL}${movie.posterImage}`} 
            alt={movie.title}
            className="movie-detail-page__image"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        <div className="movie-detail-page__info">
          <p className="movie-detail-page__description">{movie.description}</p>
          <div className="movie-detail-page__meta">
            <div>Год: {movie.year}</div>
            <div>Продолжительность: {Math.floor(movie.lengthMinutes / 60)}:{(movie.lengthMinutes % 60).toString().padStart(2, '0')}</div>
            <div>Рейтинг: {movie.rating.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="movie-detail-page__sessions">
        <SessionsList sessions={sessions || []} />
      </div>
    </div>
  );
};
