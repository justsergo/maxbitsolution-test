export const calculatePaymentTimeLeft = (bookedAt: string, paymentTimeoutSeconds: number): number => {
  const bookedTime = new Date(bookedAt).getTime();
  const expiryTime = bookedTime + paymentTimeoutSeconds * 1000;
  const now = new Date().getTime();
  const remaining = Math.max(0, expiryTime - now);
  return Math.floor(remaining / 1000);
};

export const isPaymentExpired = (bookedAt: string, paymentTimeoutSeconds: number): boolean => {
  return calculatePaymentTimeLeft(bookedAt, paymentTimeoutSeconds) === 0;
};
