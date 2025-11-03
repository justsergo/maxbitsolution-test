import { memo, useMemo, useCallback } from 'react';
import type { SeatButtonProps } from '../../types';
import './SeatButton.scss';

export const SeatButton = memo(({ 
  rowNumber, 
  seatNumber, 
  isBooked, 
  isSelected, 
  isAuthenticated,
  onClick 
}: SeatButtonProps) => {
  const className = useMemo(() => {
    let cls = 'seat-button';
    
    if (isBooked) {
      cls += ' seat-button--booked';
    } else if (isSelected) {
      cls += ' seat-button--selected';
    } else {
      cls += ' seat-button--available';
    }
    
    if (!isAuthenticated && !isBooked) {
      cls += ' seat-button--disabled';
    }
    
    return cls;
  }, [isBooked, isSelected, isAuthenticated]);

  const handleClick = useCallback(() => {
    if (isBooked || (!isAuthenticated && !isBooked)) return;
    onClick();
  }, [isBooked, isAuthenticated, onClick]);

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={isBooked || (!isAuthenticated && !isBooked)}
      aria-label={`Ряд ${rowNumber}, место ${seatNumber}`}
    />
  );
});

SeatButton.displayName = 'SeatButton';
