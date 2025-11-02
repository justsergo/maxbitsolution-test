import type { SeatButtonProps } from '../../types';
import './SeatButton.scss';

export const SeatButton = ({ 
  rowNumber, 
  seatNumber, 
  isBooked, 
  isSelected, 
  isAuthenticated,
  onClick 
}: SeatButtonProps) => {
  const getClassName = () => {
    let className = 'seat-button';
    
    if (isBooked) {
      className += ' seat-button--booked';
    } else if (isSelected) {
      className += ' seat-button--selected';
    } else {
      className += ' seat-button--available';
    }
    
    if (!isAuthenticated && !isBooked) {
      className += ' seat-button--disabled';
    }
    
    return className;
  };

  const handleClick = () => {
    if (isBooked || (!isAuthenticated && !isBooked)) return;
    onClick();
  };

  return (
    <button
      className={getClassName()}
      onClick={handleClick}
      disabled={isBooked || (!isAuthenticated && !isBooked)}
      aria-label={`Ряд ${rowNumber}, место ${seatNumber}`}
    />
  );
};
