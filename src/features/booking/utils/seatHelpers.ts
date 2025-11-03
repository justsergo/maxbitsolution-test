import type { Seat } from '../types';

export const formatSeats = (seats: Seat[]): string => {
  return seats.map((seat: Seat) => `Ряд ${seat.rowNumber}, место ${seat.seatNumber}`).join('\n');
};

export const isSeatSelected = (seat: Seat, selectedSeats: Seat[]): boolean => {
  return selectedSeats.some(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);
};

export const isSeatBooked = (seat: Seat, bookedSeats: Seat[]): boolean => {
  return bookedSeats.some(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber);
};
