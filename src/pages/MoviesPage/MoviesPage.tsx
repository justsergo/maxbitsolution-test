import { useGetMoviesQuery } from '@/features/movies/api/moviesApi';
import { API_BASE_URL } from '@/shared/constants';
import { MovieCard } from './components/MovieCard';
import './MoviesPage.scss';

export const MoviesPage = () => {
  const { data: movies, isLoading, error } = useGetMoviesQuery();

  if (isLoading) {
    return (
      <div className="movies-page">
        <div className="movies-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-page">
        <div className="movies-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <div className="movies-page__header">
        <div className="movies-page__header-poster"></div>
        <div className="movies-page__header-title">Название</div>
        <div className="movies-page__header-duration">Продолжительность</div>
        <div className="movies-page__header-rating">Рейтинг</div>
        <div className="movies-page__header-actions"></div>
      </div>
      
      <div className="movies-page__list">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            lengthMinutes={movie.lengthMinutes}
            rating={movie.rating}
            posterImage={`${API_BASE_URL}${movie.posterImage}`}
          />
        ))}
      </div>
    </div>
  );
};
