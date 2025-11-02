export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface BookingRequest {
  seats: Seat[];
}

export interface BookingResponse {
  bookingId: string;
}
