import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import './SessionTimeButton.scss';

interface SessionTimeButtonProps {
  sessionId: number;
  time: string;
}

export const SessionTimeButton = ({ sessionId, time }: SessionTimeButtonProps) => {
  return (
    <Link 
      to={ROUTES.SESSION_BOOKING(sessionId)}
      className="session-time-button"
    >
      {time}
    </Link>
  );
};
