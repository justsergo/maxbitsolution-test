import type { Booking } from '@/features/tickets/types';

export interface TicketsListProps {
  bookings: Booking[];
  paymentTimeoutSeconds: number;
}

export interface TicketCardProps {
  booking: Booking;
  paymentTimeoutSeconds: number;
  category: 'unpaid' | 'upcoming' | 'past';
}

export interface PaymentTimerProps {
  bookingId: string;
  bookedAt: string;
  paymentTimeoutSeconds: number;
  onExpired: () => void;
}
