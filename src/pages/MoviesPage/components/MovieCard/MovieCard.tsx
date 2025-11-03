import { Icon } from '@/shared/ui/Icon';
import { LookSessionsButton } from '@/shared/ui/LookSessionsButton';
import type { MovieCardProps } from '../types';
import './MovieCard.scss';

export const MovieCard = ({ id, title, lengthMinutes, rating, posterImage }: MovieCardProps) => {
  const formatDuration = (minutes: number) => {
    if (!minutes || isNaN(minutes)) {
      return '0:00';
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="movie-card">
      <div className="movie-card__poster">
        {posterImage ? (
          <img 
            src={posterImage} 
            alt={title}
            className="movie-card__image"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="movie-card__placeholder">
            <Icon name="image-placeholder" size={24} />
          </div>
        )}
      </div>
      
      <div className="movie-card__title">{title}</div>
      <div className="movie-card__duration">{formatDuration(lengthMinutes)}</div>
      <div className="movie-card__rating">{rating && !isNaN(rating) ? rating.toFixed(2) : '0.00'}</div>
      <div className="movie-card__actions">
        <LookSessionsButton movieId={id} />
      </div>
    </div>
  );
};
