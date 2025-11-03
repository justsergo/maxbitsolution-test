import { useState, useEffect } from 'react';
import { formatTime } from '@/shared/utils';
import { calculatePaymentTimeLeft } from '@/features/tickets/utils';
import type { PaymentTimerProps } from '../types';
import './PaymentTimer.scss';

export const PaymentTimer = ({ bookingId, bookedAt, paymentTimeoutSeconds, onExpired }: PaymentTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimeLeft = () => {
      const remaining = calculatePaymentTimeLeft(bookedAt, paymentTimeoutSeconds);
      
      if (remaining === 0) {
        onExpired();
      }
      
      return remaining;
    };

    setTimeLeft(updateTimeLeft());

    const interval = setInterval(() => {
      const remaining = updateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingId, bookedAt, paymentTimeoutSeconds, onExpired]);

  if (timeLeft === 0) {
    return null;
  }

  return (
    <div className="payment-timer">
      <span className="payment-timer__label">Осталось</span>
      <span className="payment-timer__time">{formatTime(timeLeft)}</span>
    </div>
  );
};
