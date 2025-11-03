import { usePayBookingMutation, useGetMyBookingsQuery } from '@/features/tickets/api/ticketsApi';
import { useGetMovieSessionDetailQuery } from '@/features/movies/api/moviesApi';
import { useGetMoviesQuery } from '@/features/movies/api/moviesApi';
import { useGetCinemasQuery } from '@/features/cinemas/api/cinemasApi';
import { PaymentTimer } from '../PaymentTimer';
import { Button } from '@/shared/ui/Button';
import type { TicketCardProps } from '../../types';
import type { Seat } from '@/features/booking/types';
import './TicketCard.scss';

export const TicketCard = ({ booking, paymentTimeoutSeconds, category }: TicketCardProps) => {
  const [payBooking, { isLoading: paymentLoading }] = usePayBookingMutation();
  const { refetch: refetchBookings } = useGetMyBookingsQuery(undefined, {
    skip: true,
  });

  const { data: sessionDetail } = useGetMovieSessionDetailQuery(booking.movieSessionId);
  const { data: movies = [] } = useGetMoviesQuery();
  const { data: cinemas = [] } = useGetCinemasQuery();

  const movie = movies.find(m => m.id === sessionDetail?.movieId);
  const cinema = cinemas.find(c => c.id === sessionDetail?.cinemaId);

  const handlePayment = async () => {
    try {
      await payBooking(booking.id).unwrap();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatSeats = (seats: Seat[]) => {
    return seats.map((seat: Seat) => `Ряд ${seat.rowNumber}, место ${seat.seatNumber}`).join('\n');
  };

  const sessionDateTime = sessionDetail?.startTime ? 
    formatDateTime(sessionDetail.startTime) : 
    { date: '', time: '' };

  return (
    <div className="ticket-card">
      <div className="ticket-card__info">
        <div className="ticket-card__movie">
          {movie?.title || 'Неизвестный фильм'}
        </div>
        <div className="ticket-card__cinema">
          {cinema?.name || 'Неизвестный кинотеатр'}
        </div>
        <div className="ticket-card__datetime">
          {sessionDateTime.date} {sessionDateTime.time}
        </div>
      </div>

      <div className="ticket-card__seats">
        {formatSeats(booking.seats)}
      </div>

      <div className="ticket-card__actions">
        {category === 'unpaid' && (
          <>
            <Button 
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? 'Оплачивается...' : 'Оплатить'}
            </Button>
            <PaymentTimer
              bookingId={booking.id}
              bookedAt={booking.bookedAt}
              paymentTimeoutSeconds={paymentTimeoutSeconds}
              onExpired={() => refetchBookings()}
            />
          </>
        )}
      </div>
    </div>
  );
};
