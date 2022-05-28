import { ICurrentBoardState, IShowState } from '../../redux/slices/board/boardTypes';
import { IBoardState, ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';
import {
  IUserState,
  IUserUpdateState,
  IUserDeleteState,
} from '../../redux/slices/users/usersTypes';
import {
  IColumnState,
  ICreateColumnData,
  IDeleteColumnData,
  IGetColumnData,
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
  (data: IDeleteColumnData) => void
];

export type IUseUsersReturn = [
  IUserState,
  (token: string) => void,
  (data: IUserUpdateState) => void,
  (data: IUserDeleteState) => void
];
