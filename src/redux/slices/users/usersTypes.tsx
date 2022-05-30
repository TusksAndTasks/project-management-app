import { IUserData } from '../user/userTypes';

export interface IUsersState {
  users: IUserData[];
  error: string;
  loading: boolean;
}

export interface IUserDeleteState {
  id: string;
  token: string;
}
