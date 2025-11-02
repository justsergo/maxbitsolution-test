import type { Seat } from '../../booking/types';

export interface Booking {
  id: string;
  movieSessionId: number;
  userId: number;
  isPaid: boolean;
  seats: Seat[];
  bookedAt: string;
}

export interface Settings {
  paymentTimeoutSeconds: number;
}

export interface PaymentResponse {
  message: string;
}
