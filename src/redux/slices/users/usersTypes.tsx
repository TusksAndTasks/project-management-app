export interface IUserData {
  id: string;
  name: string;
  login: string;
}

export interface IUserState {
  users: IUserData[];
  error: string;
  loading: boolean;
}

export interface IUserUpdateState {
  id: string;
  name: string;
  login: string;
  password: string;
  token: string;
}

export interface IUserDeleteState {
  id: string;
  token: string;
}
