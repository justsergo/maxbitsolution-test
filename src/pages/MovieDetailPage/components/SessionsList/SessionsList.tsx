import { SessionTimeButton } from '../SessionTimeButton';
import type { SessionsListProps } from '../../types';
import './SessionsList.scss';

export const SessionsList = ({ sessions, cinemas }: SessionsListProps) => {
  const groupedSessions = sessions.reduce((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
    if (!acc[date]) {
      acc[date] = {};
    }
    
    const cinema = cinemas.find(c => c.id === session.cinemaId);
    const cinemaName = cinema?.name || 'Неизвестный кинотеатр';
    if (!acc[date][cinemaName]) {
      acc[date][cinemaName] = [];
    }
    
    acc[date][cinemaName].push(session);
    return acc;
  }, {} as Record<string, Record<string, typeof sessions>>);

  if (sessions.length === 0) {
    return (
      <div className="sessions-list">
        <div className="sessions-list__empty">Нет доступных сеансов</div>
      </div>
    );
  }

  return (
    <div className="sessions-list">
      {Object.entries(groupedSessions).map(([date, cinemas]) => (
        <div key={date} className="sessions-list__date-group">
          <h3 className="sessions-list__date">{date}</h3>
          
          {Object.entries(cinemas).map(([cinemaName, cinemaSessions]) => (
            <div key={cinemaName} className="sessions-list__cinema">
              <div className="sessions-list__cinema-name">{cinemaName}</div>
              <div className="sessions-list__times">
                {cinemaSessions.map((session) => (
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
          ))}
        </div>
      ))}
    </div>
  );
};
