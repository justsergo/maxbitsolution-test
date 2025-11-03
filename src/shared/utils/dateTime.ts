export interface FormattedDateTime {
  date: string;
  time: string;
}

export const formatDateTime = (dateTime: string): FormattedDateTime => {
  const date = new Date(dateTime);
  return {
    date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  };
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const calculateTimeLeft = (startTime: Date, timeoutSeconds: number): number => {
  const expiryTime = startTime.getTime() + timeoutSeconds * 1000;
  const now = new Date().getTime();
  const remaining = Math.max(0, expiryTime - now);
  return Math.floor(remaining / 1000);
};
