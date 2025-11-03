import { Icon } from '@/shared/ui/Icon';
import { LookSessionsButton } from '@/shared/ui/LookSessionsButton';
import { formatDuration, formatRating } from '@/features/movies/utils';
import type { MovieCardProps } from '../types';
import './MovieCard.scss';

export const MovieCard = ({ id, title, lengthMinutes, rating, posterImage }: MovieCardProps) => {

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
      <div className="movie-card__rating">{formatRating(rating)}</div>
      <div className="movie-card__actions">
        <LookSessionsButton movieId={id} />
      </div>
    </div>
  );
};
