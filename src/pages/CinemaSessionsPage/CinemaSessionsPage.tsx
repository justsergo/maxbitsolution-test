import { useParams } from 'react-router-dom';
import { useGetCinemasQuery, useGetCinemaSessionsQuery } from '../../features/cinemas/api/cinemasApi';
import { useGetMoviesQuery } from '../../features/movies/api/moviesApi';
import { CinemaSessionsList } from './components/CinemaSessionsList';
import './CinemaSessionsPage.scss';

export const CinemaSessionsPage = () => {
  const { cinemaId } = useParams<{ cinemaId: string }>();
  const cinemaIdNum = Number(cinemaId);

  const { data: cinemas, isLoading: cinemasLoading } = useGetCinemasQuery();
  const { data: sessions, isLoading: sessionsLoading, error: sessionsError } = useGetCinemaSessionsQuery(cinemaIdNum);
  const { data: movies } = useGetMoviesQuery();

  const cinema = cinemas?.find(c => c.id === cinemaIdNum);

  if (cinemasLoading || sessionsLoading) {
    return (
      <div className="cinema-sessions-page">
        <div className="cinema-sessions-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (!cinema) {
    return (
      <div className="cinema-sessions-page">
        <div className="cinema-sessions-page__error">Кинотеатр не найден</div>
      </div>
    );
  }

  if (sessionsError) {
    return (
      <div className="cinema-sessions-page">
        <div className="cinema-sessions-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  return (
    <div className="cinema-sessions-page">
      <h1 className="cinema-sessions-page__title">{cinema.name}</h1>
      
      <div className="cinema-sessions-page__sessions">
        <CinemaSessionsList sessions={sessions || []} movies={movies || []} />
      </div>
    </div>
  );
};
