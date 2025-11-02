import { useMemo } from 'react';
import { TicketCard } from '../TicketCard';
import type { TicketsListProps } from '../../types';
import type { Booking } from '../../../../features/tickets/types';
import './TicketsList.scss';

export const TicketsList = ({ bookings, paymentTimeoutSeconds }: TicketsListProps) => {
  const groupedBookings = useMemo(() => {
    const now = new Date();
    
    const unpaid: Booking[] = [];
    const upcoming: Booking[] = [];
    const past: Booking[] = [];

    bookings.forEach(booking => {
      if (!booking.isPaid) {
        const bookedTime = new Date(booking.bookedAt);
        const expiryTime = new Date(bookedTime.getTime() + paymentTimeoutSeconds * 1000);
        
        if (now < expiryTime) {
          unpaid.push(booking);
        }
      } else {
        upcoming.push(booking);
      }
    });

    return { unpaid, upcoming, past };
  }, [bookings, paymentTimeoutSeconds]);

  if (bookings.length === 0) {
    return (
      <div className="tickets-list">
        <div className="tickets-list__empty">
          Ваши билеты будут отображаться здесь после бронирования.
        </div>
      </div>
    );
  }

  return (
    <div className="tickets-list">
      {groupedBookings.unpaid.length > 0 && (
        <div className="tickets-list__section">
          <h2 className="tickets-list__section-title">Не оплаченные</h2>
          <div className="tickets-list__cards">
            {groupedBookings.unpaid.map(booking => (
              <TicketCard
                key={booking.id}
                booking={booking}
                paymentTimeoutSeconds={paymentTimeoutSeconds}
                category="unpaid"
              />
            ))}
          </div>
        </div>
      )}

      {groupedBookings.upcoming.length > 0 && (
        <div className="tickets-list__section">
          <h2 className="tickets-list__section-title">Будущие</h2>
          <div className="tickets-list__cards">
            {groupedBookings.upcoming.map(booking => (
              <TicketCard
                key={booking.id}
                booking={booking}
                paymentTimeoutSeconds={paymentTimeoutSeconds}
                category="upcoming"
              />
            ))}
          </div>
        </div>
      )}

      {groupedBookings.past.length > 0 && (
        <div className="tickets-list__section">
          <h2 className="tickets-list__section-title">Прошедшие</h2>
          <div className="tickets-list__cards">
            {groupedBookings.past.map(booking => (
              <TicketCard
                key={booking.id}
                booking={booking}
                paymentTimeoutSeconds={paymentTimeoutSeconds}
                category="past"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
