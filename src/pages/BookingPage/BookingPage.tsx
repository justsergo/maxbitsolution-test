import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMovieSessionDetailQuery } from '../../features/movies/api/moviesApi';
import { useBookSeatsMutation } from '../../features/booking/api/bookingApi';
import { useGetMoviesQuery } from '../../features/movies/api/moviesApi';
import { useGetCinemasQuery } from '../../features/cinemas/api/cinemasApi';
import { useGetMyBookingsQuery } from '../../features/tickets/api/ticketsApi';
import { SeatMap } from './components/SeatMap';
import { Button } from '../../shared/ui/Button';
import { ROUTES } from '../../shared/constants';
import type { RootState } from '../../app/store';
import type { Seat } from '../../features/booking/types';
import './BookingPage.scss';

export const BookingPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const sessionIdNum = Number(sessionId);
  const navigate = useNavigate();
  
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const { data: sessionDetail, isLoading: sessionLoading, error: sessionError, refetch } = useGetMovieSessionDetailQuery(sessionIdNum);
  const { data: movies } = useGetMoviesQuery();
  const { data: cinemas } = useGetCinemasQuery();
  const { refetch: refetchBookings } = useGetMyBookingsQuery(undefined, { skip: !isAuthenticated });
  const [bookSeats, { isLoading: bookingLoading }] = useBookSeatsMutation();

  const movie = movies?.find(m => m.id === sessionDetail?.movieId);
  const cinema = cinemas?.find(c => c.id === sessionDetail?.cinemaId);

  const handleSeatToggle = (seat: Seat) => {
    if (!isAuthenticated) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);
      if (isSelected) {
        return prev.filter(s => !(s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber));
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (selectedSeats.length === 0) return;

    try {
      await bookSeats({
        sessionId: sessionIdNum,
        seats: { seats: selectedSeats }
      }).unwrap();
      
      refetch();
      if (isAuthenticated) {
        refetchBookings();
      }
      
      navigate(ROUTES.MY_TICKETS);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (sessionLoading) {
    return (
      <div className="booking-page">
        <div className="booking-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (sessionError || !sessionDetail) {
    return (
      <div className="booking-page">
        <div className="booking-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  const formatTime = (startTime: string) => {
    const date = new Date(startTime);
    return {
      date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatTime(sessionDetail.startTime);

  return (
    <div className="booking-page">
      <h1 className="booking-page__title">Выбрать места</h1>
      
      <div className="booking-page__info">
        <div>Фильм: {movie?.title || 'Неизвестный фильм'}</div>
        <div>Кинотеатр: {cinema?.name || 'Неизвестный кинотеатр'}</div>
        <div>Время: {date}, {time}</div>
      </div>

      <div className="booking-page__seat-map">
        <SeatMap
          rows={sessionDetail.seats.rows}
          seatsPerRow={sessionDetail.seats.seatsPerRow}
          bookedSeats={sessionDetail.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatToggle={handleSeatToggle}
          isAuthenticated={isAuthenticated}
        />
      </div>

      <div className="booking-page__actions">
        <Button 
          onClick={handleBooking}
          disabled={bookingLoading || (!isAuthenticated && selectedSeats.length === 0)}
        >
          {bookingLoading ? 'Бронирование...' : 'Забронировать'}
        </Button>
      </div>
    </div>
  );
};
