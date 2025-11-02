import { useGetCinemasQuery } from '../../features/cinemas/api/cinemasApi';
import { CinemaCard } from './components/CinemaCard';
import './CinemasPage.scss';

export const CinemasPage = () => {
  const { data: cinemas, isLoading, error } = useGetCinemasQuery();

  if (isLoading) {
    return (
      <div className="cinemas-page">
        <div className="cinemas-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cinemas-page">
        <div className="cinemas-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  return (
    <div className="cinemas-page">
      <div className="cinemas-page__header">
        <div className="cinemas-page__header-cinema">Кинотеатр</div>
        <div className="cinemas-page__header-address">Адрес</div>
        <div className="cinemas-page__header-actions"></div>
      </div>
      
      <div className="cinemas-page__list">
        {cinemas?.map((cinema) => (
          <CinemaCard
            key={cinema.id}
            id={cinema.id}
            name={cinema.name}
            address={cinema.address}
          />
        ))}
      </div>
    </div>
  );
};
