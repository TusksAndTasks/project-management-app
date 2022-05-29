export interface IUserShowState {
  id: string;
  token: string;
}

export interface IUserData {
  id: string;
  name: string;
  login: string;
}

export interface IUserUpdateState {
  id: string;
  name: string;
  login: string;
  password: string;
  token: string;
}

export interface IUserState {
  user: IUserData;
  error: string;
  loading: boolean;
}
