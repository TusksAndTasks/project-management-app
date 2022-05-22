import { ICurrentBoardState, IShowState } from '../../redux/slices/board/boardTypes';
import { IBoardState, ICreateState, IDeleteState } from '../../redux/slices/boards/boardsTypes';
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
