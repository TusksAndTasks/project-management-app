import { ICurrentBoardState, IShowState } from '../../redux/slices/board/boardTypes';
import { IBoardState, ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';
import { IUsersState, IUserDeleteState } from '../../redux/slices/users/usersTypes';
import { IUserShowState, IUserState, IUserUpdateState } from '../../redux/slices/user/userTypes';
import {
  IColumnState,
  ICreateColumnData,
  IDeleteColumnData,
  IGetColumnData,
  IUpdateColumnData,
} from '../../redux/slices/columns/columnsTypes';

export type IUseBoardsReturn = [
  IBoardState,
  (token: string) => void,
  (data: ICreateState) => void,
  (data: IDeleteState) => void
];

export type IUseBoardReturn = [ICurrentBoardState, (data: IShowState) => void];

export type IUseColumnsReturn = [
  IColumnState,
  (data: IGetColumnData) => void,
  (data: ICreateColumnData) => void,
  (data: IDeleteColumnData) => void,
  (data: IUpdateColumnData) => void
];

export type IUseUsersReturn = [IUsersState, (token: string) => void];

export type IUseUserReturn = [
  IUserState,
  (data: IUserShowState) => void,
  (data: IUserUpdateState) => void,
  (data: IUserDeleteState) => void
];
