import { LookCinemaSessionsButton } from '@/shared/ui/LookCinemaSessionsButton';
import type { CinemaCardProps } from '../types';
import './CinemaCard.scss';

export const CinemaCard = ({ id, name, address }: CinemaCardProps) => {
  return (
    <div className="cinema-card">
      <div className="cinema-card__name">{name}</div>
      <div className="cinema-card__address">{address}</div>
      <div className="cinema-card__actions">
        <LookCinemaSessionsButton cinemaId={id} />
      </div>
    </div>
  );
};
