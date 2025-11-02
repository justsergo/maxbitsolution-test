import type { Seat } from '../../features/booking/types';

export interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  selectedSeats: Seat[];
  onSeatToggle: (seat: Seat) => void;
  isAuthenticated: boolean;
}

export interface SeatButtonProps {
  rowNumber: number;
  seatNumber: number;
  isBooked: boolean;
  isSelected: boolean;
  isAuthenticated: boolean;
  onClick: () => void;
}
