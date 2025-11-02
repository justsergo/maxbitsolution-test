import './MyTicketsPage.scss';

export const MyTicketsPage = () => {
  return (
    <div className="my-tickets-page">
      <h1 className="my-tickets-page__title">Мои билеты</h1>
      <div className="my-tickets-page__content">
        <p className="my-tickets-page__message">
          Ваши билеты будут отображаться здесь после бронирования.
        </p>
      </div>
    </div>
  );
};
