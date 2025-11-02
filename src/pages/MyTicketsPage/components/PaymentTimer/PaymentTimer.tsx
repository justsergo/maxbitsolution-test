import { useState, useEffect } from 'react';
import type { PaymentTimerProps } from '../../types';
import './PaymentTimer.scss';

export const PaymentTimer = ({ bookingId, bookedAt, paymentTimeoutSeconds, onExpired }: PaymentTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const bookedTime = new Date(bookedAt).getTime();
      const expiryTime = bookedTime + paymentTimeoutSeconds * 1000;
      const now = new Date().getTime();
      const remaining = Math.max(0, expiryTime - now);
      
      if (remaining === 0) {
        onExpired();
      }
      
      return Math.floor(remaining / 1000);
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingId, bookedAt, paymentTimeoutSeconds, onExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
