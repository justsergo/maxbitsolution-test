export interface ApiError {
  status: number;
  message: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}

export interface User {
  id: number;
  username: string;
}

export interface BaseApiRequest {
  [key: string]: any;
}

export interface BaseApiResponse {
  [key: string]: any;
}
