import { SeatButton } from '../SeatButton';
import type { SeatMapProps } from '../../types';
import './SeatMap.scss';

export const SeatMap = ({ 
  rows, 
  seatsPerRow, 
  bookedSeats, 
  selectedSeats, 
  onSeatToggle, 
  isAuthenticated 
}: SeatMapProps) => {
  const isBooked = (rowNumber: number, seatNumber: number) => {
    return bookedSeats.some(seat => 
      seat.rowNumber === rowNumber && seat.seatNumber === seatNumber
    );
  };

  const isSelected = (rowNumber: number, seatNumber: number) => {
    return selectedSeats.some(seat => 
      seat.rowNumber === rowNumber && seat.seatNumber === seatNumber
    );
  };

  const handleSeatClick = (rowNumber: number, seatNumber: number) => {
    if (isBooked(rowNumber, seatNumber)) return;
    onSeatToggle({ rowNumber, seatNumber });
  };

  return (
    <div className="seat-map">
      <div className="seat-map__header">
        {Array.from({ length: seatsPerRow }, (_, index) => (
          <div key={index} className="seat-map__column-number">
            {index + 1}
          </div>
        ))}
      </div>

      <div className="seat-map__rows">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className="seat-map__row">
              <div className="seat-map__row-label">ряд {rowNumber}</div>
              <div className="seat-map__seats">
                {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                  const seatNumber = seatIndex + 1;
                  const booked = isBooked(rowNumber, seatNumber);
                  const selected = isSelected(rowNumber, seatNumber);
                  
                  return (
                    <SeatButton
                      key={seatNumber}
                      rowNumber={rowNumber}
                      seatNumber={seatNumber}
                      isBooked={booked}
                      isSelected={selected}
                      isAuthenticated={isAuthenticated}
                      onClick={() => handleSeatClick(rowNumber, seatNumber)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
