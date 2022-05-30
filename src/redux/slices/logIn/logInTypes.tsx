export interface ILogInData {
  login: string;
  password: string;
}

export interface ILogInResponse {
  token: string;
}

export interface ILogInState {
  loading: boolean;
  error: string;
}
