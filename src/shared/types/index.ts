export interface ApiError {
  status: number;
  message: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}

export interface User {
  id: number;
  username: string;
}

export interface BaseApiRequest {
  [key: string]: unknown;
}

export interface BaseApiResponse {
  [key: string]: unknown;
}
