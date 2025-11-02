export interface Movie {
  id: number;
  title: string;
  description: string;
  lengthMinutes: number;
  rating: number;
  year: number;
  posterImage: string;
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
}

export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  price?: number;
  cinema?: Cinema;
}

export interface MovieSessionDetail extends MovieSession {
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: Array<{
    rowNumber: number;
    seatNumber: number;
  }>;
}
