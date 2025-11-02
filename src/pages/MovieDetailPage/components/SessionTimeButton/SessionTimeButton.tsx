import { Link } from 'react-router-dom';
import type { SessionTimeButtonProps } from '../../types';
import './SessionTimeButton.scss';

export const SessionTimeButton = ({ sessionId, time }: SessionTimeButtonProps) => {
  return (
    <Link 
      to={`/sessions/${sessionId}/booking`}
      className="session-time-button"
    >
      {time}
    </Link>
  );
};
