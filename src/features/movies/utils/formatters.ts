export const formatDuration = (minutes: number): string => {
  if (!minutes || isNaN(minutes)) {
    return '0:00';
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

export const formatRating = (rating: number): string => {
  return rating && !isNaN(rating) ? rating.toFixed(2) : '0.00';
};
