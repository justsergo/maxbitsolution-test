import { memo, useMemo, useCallback } from 'react';
import { SeatButton } from '../SeatButton';
import { isSeatBooked, isSeatSelected } from '@/features/booking/utils';
import type { SeatMapProps } from '../../types';
import './SeatMap.scss';

export const SeatMap = memo(({ 
  rows, 
  seatsPerRow, 
  bookedSeats, 
  selectedSeats, 
  onSeatToggle, 
  isAuthenticated 
}: SeatMapProps) => {
  const seatRows = useMemo(() => {
    return Array.from({ length: rows }, (_, rowIndex) => {
      const rowNumber = rowIndex + 1;
      return Array.from({ length: seatsPerRow }, (_, seatIndex) => {
        const seatNumber = seatIndex + 1;
        const seat = { rowNumber, seatNumber };
        
        return {
          ...seat,
          isBooked: isSeatBooked(seat, bookedSeats),
          isSelected: isSeatSelected(seat, selectedSeats),
        };
      });
    });
  }, [rows, seatsPerRow, bookedSeats, selectedSeats]);

  const handleSeatClick = useCallback((rowNumber: number, seatNumber: number) => {
    const seat = { rowNumber, seatNumber };
    if (isSeatBooked(seat, bookedSeats)) return;
    onSeatToggle(seat);
  }, [bookedSeats, onSeatToggle]);

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
        {seatRows.map((row, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className="seat-map__row">
              <div className="seat-map__row-label">ряд {rowNumber}</div>
              <div className="seat-map__seats">
                {row.map((seat) => (
                  <SeatButton
                    key={seat.seatNumber}
                    rowNumber={seat.rowNumber}
                    seatNumber={seat.seatNumber}
                    isBooked={seat.isBooked}
                    isSelected={seat.isSelected}
                    isAuthenticated={isAuthenticated}
                    onClick={() => handleSeatClick(seat.rowNumber, seat.seatNumber)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SeatMap.displayName = 'SeatMap';
