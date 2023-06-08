export interface Viewer {
  id: string;
  login: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_leader: boolean;
}

export interface AuthPayload {
  login: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: Viewer;
  error: AuthResponseError;
}
export interface AuthResponseError {
  code?: number;
  message?: string;
}

export interface AuthError {
  login?: string;
  password?: string;
}
