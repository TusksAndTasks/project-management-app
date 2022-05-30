export interface ISignUpData {
  name?: string;
  login: string;
  password: string;
}

export interface ISignUpResponse {
  id: string;
  login: string;
  name: string;
}

export interface ISignUpState {
  loading: boolean;
  userData: ISignUpResponse;
  error: string;
}
