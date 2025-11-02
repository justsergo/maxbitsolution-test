import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { ROUTES } from '../../constants';

interface LookSessionsButtonProps {
  movieId: number;
}

export const LookSessionsButton = ({ movieId }: LookSessionsButtonProps) => {
  return (
    <Link to={ROUTES.MOVIE_DETAIL(movieId)}>
      <Button>Посмотреть сеансы</Button>
    </Link>
  );
};
