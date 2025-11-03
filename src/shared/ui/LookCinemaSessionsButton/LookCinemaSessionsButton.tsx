import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/constants';

interface LookCinemaSessionsButtonProps {
  cinemaId: number;
}

export const LookCinemaSessionsButton = ({ cinemaId }: LookCinemaSessionsButtonProps) => {
  return (
    <Link to={ROUTES.CINEMA_SESSIONS(cinemaId)}>
      <Button>Посмотреть сеансы</Button>
    </Link>
  );
};
