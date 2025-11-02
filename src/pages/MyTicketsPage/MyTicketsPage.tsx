import { useGetMyBookingsQuery } from '../../features/tickets/api/ticketsApi';
import { useGetSettingsQuery } from '../../features/tickets/api/ticketsApi';
import { ProtectedRoute } from '../../shared/ui/ProtectedRoute';
import { TicketsList } from './components/TicketsList';
import './MyTicketsPage.scss';

export const MyTicketsPage = () => {
  return (
    <ProtectedRoute>
      <MyTicketsPageContent />
    </ProtectedRoute>
  );
};

const MyTicketsPageContent = () => {
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useGetMyBookingsQuery();
  const { data: settings } = useGetSettingsQuery();

  if (bookingsLoading) {
    return (
      <div className="my-tickets-page">
        <div className="my-tickets-page__loading">Загрузка...</div>
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="my-tickets-page">
        <div className="my-tickets-page__error">
          Произошла ошибка при запросе к серверу
        </div>
      </div>
    );
  }

  return (
    <div className="my-tickets-page">
      <h1 className="my-tickets-page__title">Мои билеты</h1>
      
      <div className="my-tickets-page__content">
        <TicketsList 
          bookings={bookings || []} 
          paymentTimeoutSeconds={settings?.paymentTimeoutSeconds || 300}
        />
      </div>
    </div>
  );
};
